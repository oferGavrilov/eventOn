import Header from 'components/home/Header'
import Hero from 'components/home/Hero'
import Review from 'components/home/Review'
import Teaser from 'components/home/Teaser'

const Home = (): JSX.Element => {
    return (
        <>
            <Header />
            <Teaser />
            <Hero />
            <Review />
        </>
    )
}

export default Home