
const Teaser = (): JSX.Element => {
  return (
    <div className="grid grid-cols-3 gap-4 my-10 mx-6">
        <img src="teaser1.jpg" alt="teaser 1" className="rounded-lg object-cover h-full"/>
        <img src="teaser2.jpg" alt="teaser 2" className="rounded-lg object-cover h-full"/>
        <img src="teaser3.jpg" alt="teaser 3" className="rounded-lg object-cover h-full"/>
    </div>
  )
}

export default Teaser