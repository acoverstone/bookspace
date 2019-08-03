package model

// Surprise represents a list of books for the surprise functionality
type Surprise struct {
	Books []string `json:"books"`
	Type  string   `json:"surprise_type"`
}

// RecommendedSurprise - a set of recommended books
var RecommendedSurprise = Surprise{
	Books: []string{
		"I6iaDAAAQBAJ", // Tools of Titans
		"aeJzAgAAQBAJ", // Island of Knowledge
		"sxVHDwAAQBAJ", // 12 Rules for Life
		"dmhNAgAAQBAJ", // Waking Up
		"yRaMDAEACAAJ", // Simple Path To Wealth
		"K2AvZmco3E0C", // Man's Search For Meaning
		"A91urgEACAAJ", // The Alchemist
		"_gA_DwAAQBAJ", // Surely You're Joking, Mr. Feynman!
		"xm58YGKUUl4C", // The Lessons of History
		"QwJ7vgAACAAJ", // Rich Dad Poor Dad
		"O1MInVXd_aoC", // The Power of Habit
		"8bbMjwEACAAJ", // Think And Grow Rich
		"FmyBAwAAQBAJ", // Sapiens
	},
	Type: "Recommended by Adam (App Creator)",
}

// PopularSurprise - a set of popular books
var PopularSurprise = Surprise{
	Books: []string{
		"FICLzcp22b8C", // Don Quixote
		"geAU_jMC7UUC", // The Lord of the Rings
		"mTxbDwAAQBAJ", // The Little Prince
		"39iYWTb6n6cC", // Harry Potter
		"sazytgAACAAJ", // Hunger Games
		"ACMYLqk_7GoC", // And Then There Were None
		"AjIWAAAAYAAJ", // Alice’s Adventures in Wonderland
		"L43FAF0Ynr8C", // The Lion, The Witch and the Wardrobe
		"A91urgEACAAJ", // The Alchemist
	},
	Type: "Most Popular Titles",
}

// FictionSurprise - a set of popular books
var FictionSurprise = Surprise{
	Books: []string{
		"PGR2AwAAQBAJ", // To Kill A MockingBird
		"VznTCwAAQBAJ", // Book Thief
		"A91urgEACAAJ", // The Alchemist
		"39iYWTb6n6cC", // Harry Potter
		"CGVDDwAAQBAJ", // Where The Crawdads
		"YqfPAAAAMAAJ", // A Tale of Two Cities
		"pD6arNyKyi8C", // Hobbit
		//hunger games
	},
	Type: "Popular Fiction Titles",
}

// ScienceSurprise - a set of popular books
var ScienceSurprise = Surprise{
	Books: []string{
		"aeJzAgAAQBAJ", // Island of Knowledge
		"FmyBAwAAQBAJ", // Sapiens
		"P4WNPwAACAAJ", // A Brief History of Time
		"hx5DDQAAQBAJ", // Astrophysics for People in a Hurry
		"ZlU3DwAAQBAJ", // Why We Sleep
		"cDKODQAAQBAJ", // Cosmos
		"YY4EAAAAYAAJ", // Origin of The Species
		"mTYj9XUlYvMC", // Influence

	},
	Type: "Popular Science Titles",
}

// BiographySurprise - a set of popular books
var BiographySurprise = Surprise{
	Books: []string{
		"wO3PCgAAQBAJ", // Shoe Dog
		"VGZ7HbvqenkC", // Open,
		"NWxnDythozIC", // Losing My Virginity
		"_gA_DwAAQBAJ", // Surely You're Joking, Mr. Feynman!
		"ll4qDwAAQBAJ", // Totto-Chan
		"qKff36kiX4cC", // Socrates
		"6e4cDvhrKhgC", // Steve Jobs
		"L64OOJGaCKIC", // Ben Franklin
		"7FZ6AcGmT0AC", //How to fail at almost everything
	},
	Type: "Popular Biographical Titles",
}

// NonfictionSurprise - a set of popular books
var NonfictionSurprise = Surprise{
	Books: []string{
		"O1MInVXd_aoC", // The Power of Habit
		"QGaMDQAAQBAJ", // AntiFragile
		"A5moyserOFIC", // Wealth Of Nations
		"FmyBAwAAQBAJ", // Sapiens
		"qKff36kiX4cC", // Socrates
		"xm58YGKUUl4C", // The Lessons of History
		"C8eRvgEACAAJ", // Those Who Wander
		"drYoDwAAQBAJ", // Tribe OF Mentors
		"2ObWDgAAQBAJ", // Educated
		"0KYWs7EdKYMC", // Win Friends and Influence
		"VKGbb1hg8JAC", //Blink
	},
	Type: "Popular Non-Fiction Titles",
}

// ScifiSurprise - a set of popular books
var ScifiSurprise = Surprise{
	Books: []string{
		"j24GMN0OtS8C", // Hitchhiker's Guide
		"yxv1LK5gyV4C", // 1984
		"ydQiDQAAQBAJ", // Dune
		"QEhWPgAACAAJ", // I-Robot
		"p9UiDQAAQBAJ", //Stranger in a Strange Land
		"kExaAAAAMAAJ", // 	Fahrenheit 451
		"niDNtZoYsAUC", // Brave New World
		"sazytgAACAAJ", // Hunger Games
	},
	Type: "Popular Science Fiction Titles",
}

// ClassicSurprise - a set of popular books
var ClassicSurprise = Surprise{
	Books: []string{
		"PGR2AwAAQBAJ", // To Kill A MockingBird
		"putbK6p2o4sC", // Siddhartha
		"nFtv6YbkoGwC", // The Old Man and the Sea
		"vVl_DwAAQBAJ", // Anne Frank
		"L43FAF0Ynr8C", // The Lion, The Witch and the Wardrobe
		"nkalO3OsoeMC", // Animal Farm
		"K2AvZmco3E0C", // Man's Search For Meaning
		"HestSXO362YC", // Great Gatsby
		"YqfPAAAAMAAJ", // Tale of Two Cities
		"4w1vQRkAVxYC", // On The Road
		"5qcAEZZibB0C", // Meditations
	},
	Type: "Popular Classic Titles",
}

// SelfImprovementSurprise - a set of popular books
var SelfImprovementSurprise = Surprise{
	Books: []string{
		"q3pHOXF3vzAC", // Talk To Anyone
		"ycEKAgAAQBAJ", //10% Happier
		"8bbMjwEACAAJ", // Think And Grow Rich
		"I6iaDAAAQBAJ", // Tools of Titans
		"sxVHDwAAQBAJ", // 12 Rules for Life
		"_4YvPwAACAAJ", // Unlimited Power
		"0KYWs7EdKYMC", // Win Friends and Influence
		"6h8jkUBC4asC", // Stumbling Upon Happiness
		"drYoDwAAQBAJ", // Tribe Of Mentors
		"OgXxhmGiRB0C", // Emotional Intelligence
		"ZH4oAwAAQBAJ", // Zero To One
		"mTYj9XUlYvMC", // Influence
	},
	Type: "Popular Self-Improvement Titles",
}

// FinanceSurprise - a set of popular books
var FinanceSurprise = Surprise{
	Books: []string{
		"779fQgAACAAJ", // Intelligent Investor
		"QwJ7vgAACAAJ", // Rich Dad Poor Dad
		"KTObBQAAQBAJ", // The Richest Man in Babylon
		"yRaMDAEACAAJ", // Simple Path To Wealth
		"XA5uDwAAQBAJ", // Unshakeable
		"2pphyRUF3eoC", // Freakonomics
		"YtE6JJ78XLcC", // I will Teach you to be rich
		"wO9UDgAAQBAJ", //Wealth Can’t Wait

	},
	Type: "Popular Finance Titles",
}
