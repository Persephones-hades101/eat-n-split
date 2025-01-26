import { useState } from "react"
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];


function App() {
  const [showAddFriend, setShowAddFriend] = useState(false)
  const [friends, setFriends] = useState(initialFriends)

  function handleAddFriends(newFriend) {
    setFriends((friend) => [...friend, newFriend])
    setShowAddFriend((show) => !show)
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={friends} />
        {showAddFriend
          ? <FormAddFriend handleAddFriends={handleAddFriends} />
          : null
        }
        <Button onClick={() => setShowAddFriend(show => !show)}>{!showAddFriend ? "Add Friend" : "close"}</Button>
      </div>
      <FormSplitBill />
    </div>
  );
}


function FriendList({ friends }) {
  // const friends = initialFriends
  return (

    <ul>
      {
        friends.map((friend) => (
          <Friend friend={friend} key={friend.id} />
        ))
      }
    </ul>

  )
}


function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && (
        <p>
          You and {friend.name}  are even
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}
      <Button>Select</Button>
    </li>
  )
}


function Button({ children, onClick }) {
  return <button className="button" onClick={onClick}>{children}</button>
}

function FormAddFriend({ handleAddFriends }) {

  const [friendName, setFriendName] = useState("")
  const [imgUrl, setImgUrl] = useState("https://i.pravatar.cc/48")



  function handleSubmit(e) {
    e.preventDefault()

    if (!friendName || !imgUrl) return;

    const id = crypto.randomUUID();
    const newFriend = { id, name: friendName, image: `${imgUrl}?u=${id}`, balance: 0 }
    handleAddFriends(newFriend)

  }

  return <form className="form-add-friend" onSubmit={handleSubmit}>
    <label>Friend Name</label>
    <input type="text" value={friendName} onChange={(e) => setFriendName(e.target.value)} />

    <label>Image URL</label>
    <input type="text" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />

    <Button>Add</Button>
  </form>
}

function FormSplitBill() {
  return <form className="form-split-bill">
    <h2>Split the bill with X</h2>

    <label>Bill value</label>
    <input type="text" />

    <label>Your expense</label>
    <input type="text" />

    <label>X's expense</label>
    <input type="text" disabled />

    <label>Who is paying the bill</label>
    <select >
      <option value="you">You</option>
      <option value="friend">X</option>
    </select>
    <Button>Split bill</Button>
  </form>
}


export default App;
