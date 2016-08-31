////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Create a chat application using the utility methods we give you
//
// Need some ideas?
//
// - Cause the message list to automatically scroll as new
//   messages come in
// - Highlight messages from you to make them easy to find
// - Highlight messages that mention you by your GitHub username
// - Group subsequent messages from the same sender
// - Create a filter that lets you filter messages in the chat by
//   sender and/or content
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'
import { login, sendMessage, subscribeToMessages } from './utils/ChatUtils'
import './styles'

/*
Here's how to use the ChatUtils:

login((error, auth) => {
  // hopefully the error is `null` and you have a auth.github object
})

sendMessage(
  auth.uid,                       // the auth.uid string
  auth.github.username,           // the username
  auth.github.profileImageURL,    // the user's profile image
  'hello, this is a message'      // the text of the message
)

const unsubscribe = subscribeToMessages(messages => {
  // here are your messages as an array, it will be called
  // every time the messages change
})

unsubscribe() // stop listening for new messages

The world is your oyster!
*/

const Chat = React.createClass({
  getInitialState() {
    return {
      error: null,
      auth: null,
      messages: [],
      messageToSend: '',
        usernameFilter: '',
        contentFilter: ''
    }
  },
  groupMessages(messages) {
      return messages.filter((message) => (
          message.username.indexOf(this.state.usernameFilter) > -1
      )).filter((message) => (
          message.text.indexOf(this.state.contentFilter) > -1
      )).reduce((currentGroupings, message) => {
          if (currentGroupings.length === 0 ){
            currentGroupings.push({
              username: message.username,
              avatarURL: message.avatarURL,
              messages: [message]
            })
          } else {
            if (currentGroupings[currentGroupings.length-1].username === message.username){
              currentGroupings[currentGroupings.length-1].messages.push(message);
            } else {
              currentGroupings.push({
                username: message.username,
                avatarURL: message.avatarURL,
                messages: [message]
              })
            }
          }
        return currentGroupings;
      }, [])
  },
  doImperativeThings() {
      login((error, auth) => {
        this.setState({
          error: error,
          auth: auth
        })
        subscribeToMessages(messages => {
          this.setState({
            messages: messages
          })
        })
      })
  },
  componentDidMount() {
    this.doImperativeThings()
  },
    // last chance to measure before render
    componentWillUpdate() {
        const {scrollTop, scrollHeight, clientHeight} = this.refs.scroller;
        this.autoScroll = ((scrollHeight - clientHeight) - scrollTop) < 10;
    },
    // immediately after render
  componentDidUpdate() {
      if (this.autoScroll) {
          this.refs.scroller.scrollTop = this.refs.scroller.scrollHeight
      }
  },
  render() {
    const {
        usernameFilter,
        contentFilter,
        error,
        auth,
        messages,
        messageToSend
        } = this.state
    return (
      <div className="chat">
        {(error !== null) && (<div>There was an issue logging in: {error.toString()}</div>)}
        {(auth !== null) && (<div>Logged in as: {auth.github.displayName}</div>)}
        <header className="chat-header">
          <h1 className="chat-title">HipReact</h1>
          <p className="chat-message-count"># messages: 3</p>
        </header>
          <div className="chat-filter">
              <input className="filter-username" value={usernameFilter}
                     placeholder="Filter by Username"
                     onChange={(e) => {
                        this.setState({
                            usernameFilter: e.target.value
                        })
                        this.setState({filteredMessages: this.groupMessages(this.state.messages)})
                     }}
                  />
              <input className="filter-content" value={contentFilter}
                     placeholder="Filter by Content"
                     onChange={(e) => {
                        this.setState({
                        contentFilter: e.target.value
                        })
                        this.setState({filteredMessages: this.groupMessages(this.state.messages)})
                     }}
                  />
          </div>
        <div className="messages" ref="scroller">
          <ol className="message-groups">
            {this.groupMessages(messages).map((message) => {
              return <li className="message-group"
                  style={message.username === auth.github.username ? {
                  background: "rgba(0,255,0,.05)",
                  "font-size": '2rem',
                  "min-height": '80px'
                  } : {}}>
                <div className="message-group-avatar">
                  <img src={message.avatarURL}
                       style={message.username === auth.github.username ? {
                  width: '80px',
                  height: '80px'
                  } : {}}/>
                </div>
                <ol className="messages">
                  {message.messages.map((innerMessage) => {
                    return <li className="message"
                               style={innerMessage.text.indexOf(auth.github.username) > -1 ? {
                          background: "rgba(0,0,255,.05)",
                          "font-size": '2rem'
                          } : {}}
                        >{innerMessage.text}</li>
                  })}
                </ol>
              </li>
            })}
          </ol>
        </div>
        <div className="new-message-form">
          <div className="new-message">
            <input ref="message" type="text" placeholder="say something..." value={messageToSend}
                   onKeyUp={(e) => {
                      if (e.keyCode === 13) {
                        sendMessage(auth.uid, auth.github.username, auth.github.profileImageURL, e.target.value)
                        this.setState({
                          messageToSend: ''
                        })
                      }
                   }}
                  onChange={(e) => {
                      this.setState({
                        messageToSend: e.target.value
                      })
                    }}/>
          </div>
        </div>
      </div>
    )
  }
})

render(<Chat/>, document.getElementById('app'))