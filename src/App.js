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
  const [selectedFriend, setSelectedFriend] = useState(null)

  function handleShowAddFriends() {
    setShowAddFriend(show => !show)
    setSelectedFriend(null)
  }

  function handleAddFriends(newFriend) {
    setFriends((friend) => [...friend, newFriend])
    setShowAddFriend((show) => !show)
  }

  function handleShowBillSplitForm(friend) {
    setSelectedFriend((selectedFriend) => selectedFriend === friend ? null : friend)
    setShowAddFriend(false)
  }

  return (
    <div className="app">
      <div className="sidebar">

        <FriendList
          friends={friends}
          onShowBillSplitForm={handleShowBillSplitForm}
          selectedFriend={selectedFriend}
        />


        {showAddFriend
          ? <FormAddFriend
            onAddFriends={handleAddFriends}
          />
          : null
        }


        <Button
          onClick={handleShowAddFriends}>
          {!showAddFriend ? "Add Friend" : "close"}
        </Button>

      </div>

      {selectedFriend && (
        <FormSplitBill
          friend={selectedFriend}
        />
      )}
    </div>
  );
}


function FriendList({ friends, onShowBillSplitForm, selectedFriend }) {
  // const friends = initialFriends
  return (

    <ul>
      {
        friends.map((friend) => (
          <Friend
            friend={friend}
            key={friend.id}
            onShowBillSplitForm={onShowBillSplitForm}
            selectedFriend={selectedFriend}
          />
        ))
      }
    </ul>

  )
}


function Friend({ friend, onShowBillSplitForm, selectedFriend }) {
  const isSelected = friend === selectedFriend
  return (
    <li className={isSelected ? 'selected' : ''}>
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
      <Button
        onClick={() => { onShowBillSplitForm(friend) }}
      >
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  )
}


function Button({ children, onClick }) {
  return <button className="button" onClick={onClick}>{children}</button>
}




function FormAddFriend({ onAddFriends }) {

  const [friendName, setFriendName] = useState("")
  const [imgUrl, setImgUrl] = useState("https://i.pravatar.cc/48")



  function handleSubmit(e) {
    e.preventDefault()

    if (!friendName || !imgUrl) return;

    const id = crypto.randomUUID();
    const newFriend = { id, name: friendName, image: `${imgUrl}?u=${id}`, balance: 0 }
    onAddFriends(newFriend)

  }

  return <form className="form-add-friend" onSubmit={handleSubmit}>
    <label>Friend Name</label>
    <input type="text" value={friendName} onChange={(e) => setFriendName(e.target.value)} />

    <label>Image URL</label>
    <input type="text" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />

    <Button>Add</Button>
  </form>
}





function FormSplitBill({ friend }) {
  const [bill, setBill] = useState(0)
  const [yourBill, setYourBill] = useState(0)
  const friendBill = bill - yourBill
  const [whoIsPaying, setWhoIsPaying] = useState('user')



  return <form className="form-split-bill">
    <h2>Split the bill with {friend.name}</h2>

    <label>Bill value</label>
    <input
      type="text"
      value={bill}
      onChange={(e) => setBill(Number(e.target.value))}
    />

    <label>Your expense</label>
    <input
      type="text"
      value={yourBill}
      onChange={(e) => setYourBill(Number(e.target.value) > bill ? yourBill : Number(e.target.value))}
    />

    <label>{friend.name}'s expense</label>
    <input type="text" disabled value={friendBill} />

    <label>Who is paying the bill</label>
    <select value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}>
      <option value="you">You</option>
      <option value="friend">{friend.name}</option>
    </select>
    <Button>Split bill</Button>
  </form>
}


export default App;
