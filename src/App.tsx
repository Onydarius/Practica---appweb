import './App.css'

function App() {
  const Like = () => {
    return(
      <button> Me gusta</button>
    )
  }

  return (
    <>
      <button> {Like()} Me gusta</button>
      <button> {Like()} Me gusta</button>
      <button> {Like()} Me gusta</button>
    </>
  )
}

export default App
