////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - render DATA.title in an <h1>
// - render a <ul> with each of DATA.items as an <li>
// - now only render an <li> for mexican food (hint: use DATA.items.filter(...))
// - sort the items in alphabetical order by name (hint: use sort-by https://github.com/staygrimm/sort-by#example)
//
// Got extra time?
// - add a select dropdown to make filtering on `type` dynamic
// - add a button to toggle the sort order
// - Hint: you'll need an `updateThePage` function that calls `render`,
//   and then you'll need to call it in the event handlers of the form controls
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'
import sortBy from 'sort-by'

const DATA = {
  title: 'Menu',
  items: [
    { id: 1, name: 'tacos', type: 'mexican' },
    { id: 2, name: 'burrito', type: 'mexican' },
    { id: 3, name: 'tostada', type: 'mexican' },
    { id: 4, name: 'mushy peas', type: 'english' },
    { id: 5, name: 'fish and chips', type: 'english' },
    { id: 6, name: 'black pudding', type: 'english' }
  ]
}

let type = 'mexican';
let sortOrder = '';

function changeType(e){
  type = e.target.value;
  updateThePage();
}

function reverseSort(){
  if (sortOrder === ''){
    sortOrder = '-'
  } else {
    sortOrder = ''
  }
  updateThePage();
}

function updateThePage() {
  render(<Menu/>, document.getElementById('app'))
}

function Menu() {
  const items = DATA.items.filter((item) => item.type === type)
      .sort(sortBy(sortOrder+'name')).map((item) => (
      <li key={item.id}>{item.name}</li>
  ))
  return (
    <div>
      <select defaultValue={type} onChange={changeType}>
        <option value="mexican">mexican</option>
        <option value="english">english</option>
      </select>
      <button onClick={reverseSort}>
        Reverse Sort
      </button>
      <h1>{DATA.title}</h1>
      <ul>{items}</ul>
    </div>
  )
}

render(<Menu/>, document.getElementById('app'), () => {
  require('./tests').run()
})
