import React, { useState } from 'react'

type Review = {
    id: number;
    name: string;
    title: string;
    review: string;
    rating: number;
    date: string;
    profilePic: string;
}

const reviews = [
    {
        id: 1,
        name: 'Tom Weiss',
        title: 'Event planner',
        review: 'This event planning system exceeded my expectations in every aspect. Its user-friendly interface made navigating through various features a breeze.',
        rating: 5,
        date: '22 September 2023',
        profilePic: 'tom.jpg',
    },
    {
        id: 2,
        name: 'Sarah Johnson',
        title: 'Wedding Organizer',
        review: 'EventOn helped me organize the perfect wedding. The timeline feature kept everything on track, and the vendor management tools were a lifesaver!',
        rating: 5,
        date: '10 October 2023',
        profilePic: 'sarah.jpg',
    },
    {
        id: 3,
        name: 'James Smith',
        title: 'Corporate Event Manager',
        review: 'Managing corporate events has never been easier. EventOn’s tools for tracking budgets and handling logistics are top-notch.',
        rating: 4.5,
        date: '5 November 2023',
        profilePic: 'james.jpg',
    },
];

const Review = (): JSX.Element => {
    const [currentReview, setCurrentReview] = useState<Review>(reviews[0]);

    return (
        <section>
            <div className="container mx-auto px-6 py-20">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Customer Reviews</h2>
                <div className="flex items-center justify-center">
                    <div className="w-1/3">
                        <img src={currentReview.profilePic} alt={currentReview.name} className="rounded-full w-24 h-24 mx-auto mb-4 object-cover" />
                        <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">{currentReview?.name}</h3>
                        <p className="text-center text-gray-600 min-h-20">{currentReview.title}</p>
                    </div>
                    <div className="w-2/3 px-4">
                        <p className="text-xl text-gray-800 mb-6">{currentReview.review}</p>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 fill-current ${star <= currentReview.rating ? 'text-yellow-500' : 'text-gray-400'}`} viewBox="0 0 24 24">
                                        <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.4 7.4-6-4.6-6 4.6 2.4-7.4-6-4.6h7.6z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-gray-600">{currentReview.date}</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center mt-8">
                    {reviews.map((review) => (
                        <button key={review.id} onClick={() => setCurrentReview(review)} className={`w-8 h-8 mx-2 rounded-full ${review.id === currentReview.id ? 'bg-gray-800' : 'bg-gray-400'}`}></button>
                    ))}
                </div>
            </div>

        </section>
    )
}

export default Review