const _MS_PER_DAY = 1000 * 60 * 60 * 24;

const today = new Date(Date.now()).toISOString();
const this_week = new Date(Date.now() - 5 * _MS_PER_DAY).toISOString();
const yesterday = new Date(Date.now() - 1 * _MS_PER_DAY).toISOString();
const this_month = new Date(Date.now() - 15 * _MS_PER_DAY).toISOString();

export const SampleUser = {
    "id": 0,
    "type": "sample_user",
    "first_name": "Sample",
    "email": "sample@bookspace.com",
    "password": "hf2eC9uvVYZ-miWL3MjczKACUta4ZvepuJmyn7I3KEv_LaZNGzvGTc1Uc8DN0Ij--0tSHLC0kFawbaOSfjadVg==",
    "last_login": "2019-08-02T10:37:07.688034-04:00",
    "recent_searches": [],
    "library": {
      "to_read_list": [
        "2OCKrF6YNKEC",
        "2pphyRUF3eoC",
        "nRa0AwAAQBAJ",
        "drYoDwAAQBAJ",
        "A5moyserOFIC"
      ],
      "read_list": [
        {
          "id": "mTYj9XUlYvMC",
          "reading_now": false,
          "favorite": false,
          "closing_thoughts": {
            "review": "The best book I have ever read on persuasion... Broken down nicely into principles for easy understanding.",
            "rating": 5
          },
          "book_summary": "",
          "lessons": [],
          "section_notes": [
            {
              "section_title": "Chapter 1 - Perceptual Contrast",
              "notes": "Always show your least appealing option first, followed by your most appealing - at the right time. \n"
            },
            {
              "section_title": "Chapter 2 - Rule of Reciprocation",
              "notes": "Humans tend to try to return favors. Often times you can make the first kind offer or gesture and someone will try to reciprocate. To counter this, if someone uses this trick on you - recognize the trick and don’t reciprocate unless you genuinely want to.\n"
            },
            {
              "section_title": "Chapter 3 - Rule of Consistency",
              "notes": "People look for consistency in decision making to save thinking. If they agree to do something small, they tend to agree to do something larger for the same cause (foot in the door technique) as long as they think it’s their idea. Getting somebody to say (best publicly) or write something will help them believe it.\n"
            },
            {
              "section_title": "Chapter 4 - Following the Crowd",
              "notes": "This one was obvious, if you can get people (best if they are very relatable) to do something, others usually tend to do the same. Like autopilot."
            },
            {
              "section_title": "Chapter 5 - Lean Towards What You Like",
              "notes": "You lean towards who you like. People will usually make a decision leaning towards someone/thing likable."
            },
            {
              "section_title": "Chapter 6 - Or More Experienced",
              "notes": " You lean towards people with higher authority or experience. "
            },
            {
              "section_title": "Chapter 7 - Rule of Scarcity",
              "notes": "You want something more when there is less of it, even if it is the same satisfaction - natural supply and demand."
            }
          ],
          "last_updated": this_week
        },
        {
          "id": "ll4qDwAAQBAJ",
          "reading_now": false,
          "favorite": false,
          "closing_thoughts": {
            "review": "",
            "rating": 0
          },
          "book_summary": "",
          "lessons": [],
          "section_notes": [],
          "last_updated": yesterday
        },
        {
          "id": "ZlU3DwAAQBAJ",
          "reading_now": false,
          "favorite": false,
          "closing_thoughts": {
            "review": "This book really opened my eyes to the importance of sleep. A lot of seriously mind-blowing studies that show how you are literally killing yourself when you don't sleep properly.",
            "rating": 5
          },
          "book_summary": "Sleep is super important - do it and do it a lot. Don't set alarms or take sleeping pills.  ",
          "lessons": [],
          "section_notes": [],
          "last_updated": yesterday
        },
        {
          "id": "7FZ6AcGmT0AC",
          "reading_now": false,
          "favorite": false,
          "closing_thoughts": {
            "review": "",
            "rating": 0
          },
          "book_summary": "",
          "lessons": [],
          "section_notes": [],
          "last_updated": this_week
        },
        {
          "id": "q3pHOXF3vzAC",
          "reading_now": false,
          "favorite": false,
          "closing_thoughts": {
            "review": "",
            "rating": 0
          },
          "book_summary": "A fantastic manual with practical tips for communicating effectively - perfect for a young professional.",
          "lessons": [],
          "section_notes": [
            {
              "section_title": "Silent Cues",
              "notes": "1: When you make eye contact with someone, delay your smile a second or two to make it feel earned\n2/3: Give “sticky eye contact” - hold longer than normal and slowly break away after someone averts their gaze. “Epoxy eye contact” is looking at the person who isn’t the speaker to gauge their reaction.\n4: Have good posture\n5: Upon meeting someone, treat them with full welcoming attention like you are happy to meet them. Visualize as an old friend\n7: Limit your fidgeting to appear more confident, don’t touch yourself. Monitor your listener’s reactions\n9: Mentally visualize yourself doing well"
            },
            {
              "section_title": "Spoken Cues",
              "notes": "1: Tips for small talk - mood match! At least for a moment, when you first start talking to someone match your listener’s state of mind and voice tone. \n2: The first words out of your mouth aren’t as important as a positive delivery without complaining. Be relatable / comforting and then move away from mundane remarks. How are you doing, where are they from, something they’re wearing, etc.\n3: Wear/carry a whatzit, something interesting\n4: Or use a whoozat, ask about a mutual person at the event\n6: Whenever someone’s asks a question like where are you from or what do you do, never give them a one word answer - add an interesting fact or thought about it they can build on\n7: Same rule applies for making an introduction, add some extra convo juice\n8: Search for conversation clues, things that person may want to talk about \n9: Spotlight swivel - keep the spotlight on them! Ask questions and be a better listener while the other person talks\n10: When you don’t know what to say next - parrot. Just repeat last few words of what they said like a question \n11: Tell positive things early in the relationship, negative later\n12: Get the latest news before a conversational outing"
            },
            {
              "section_title": "Conversational Cues",
              "notes": "13: Never ask ‘What do you do?’. Ask about how they spend their time.\n15: Don’t reveal your similarity too soon. Avoid the quick, me too! Wait a while and make a more casual connection (don’t wait too long)\n17: Comm-YOU-nication, start appropriate sentences with YOU when giving a compliment or asking something\n18: Vary your smile between people, get a few good ones down\n19: Use relevant humor for the situation and say it how it is without euphemisms \n20: Never make a joke at some else’s expense\n21: When giving bad news, mood match the person you are delivering to\n22: Avoid a plain thank you - thank you for... [something thoughtful]\n23: make yourself interesting. Research other fields and hobbies, try new things, read about a country before visiting, learn before shopping etc."
            }
          ],
          "last_updated": this_month
        },
        {
          "id": "sxVHDwAAQBAJ",
          "reading_now": false,
          "favorite": false,
          "closing_thoughts": {
            "review": "Exactly the right philosophical book I was looking for at the right time.",
            "rating": 5
          },
          "book_summary": "If 'evil' exists (suffering - inflicted by other humans), then so does 'good', the opposite - preventing evil from happening.\n\nYou should live your life to produce 'good'. This will lead to meaning and makes your existence matter. Your actions matter, telling the truth matters, loving yourself and taking care of your health matters, having good relationships matters.",
          "lessons": [
            {
              "title": "Rule 1 - Stand up straight with your shoulders back",
              "description": "“Thus strengthened and emboldened, you may choose to embrace Being, and work for its furtherance and improvement. Thus strengthened, you may be able to stand, even during the illness of a loved one, even during the death of a parent, and allow others to find strength alongside you when they would otherwise be overwhelmed with despair. Thus emboldened, you will embark on the voyage of your life, let your light shine, so to speak, on the heavenly hill, and pursue your rightful destiny.”",
              "reference": "",
              "highlight": false
            },
            {
              "title": "Rule 2 - Treat yourself like someone you are responsible for helping",
              "description": "“Start with yourself. Take care with yourself. Define who you are. Refine your personality. Choose your destination and articulate your Being. As the great nineteenth-century German philosopher Friedrich Nietzsche so brilliantly noted, “He whose life has a why can bear almost any how.”\n",
              "reference": "",
              "highlight": false
            },
            {
              "title": "Rule 3 - Make friends with people who want the best for you",
              "description": "“Don’t think that it is easier to surround yourself with good healthy people than with bad unhealthy people. It’s not. A good, healthy person is an ideal. It requires strength and daring to stand up near such a person. Have some humility. Have some courage. Use your judgment, and protect yourself from too-uncritical compassion and pity.”",
              "reference": "",
              "highlight": false
            },
            {
              "title": "Rule 4 - Compare yourself to who you were yesterday, not who someone else is today",
              "description": "“Pay attention. Focus on your surroundings, physical and psychological. Notice something that bothers you, that concerns you, that will not let you be, which you could fix, that you would fix.”\n",
              "reference": "",
              "highlight": false
            },
            {
              "title": "Rule 5 - Do not let your children do anything that makes you dislike them",
              "description": "“A child who pays attention, instead of drifting, and can play, and does not whine, and is comical, but not annoying, and is trustworthy—that child will have friends wherever he goes. His teachers will like him, and so will his parents. If he attends politely to adults, he will be attended to, smiled at and happily instructed. He will thrive, in what can so easily be a cold, unforgiving and hostile world. Clear rules make for secure children and calm, rational parents.”",
              "reference": "",
              "highlight": false
            },
            {
              "title": "Rule 6 - Set your house in perfect order before you criticize the world",
              "description": "“Don’t blame capitalism, the radical left, or the iniquity of your enemies. Don’t reorganize the state until you have ordered your own experience. Have some humility. If you cannot bring peace to your household, how dare you try to rule a city? Let your own soul guide you. Watch what happens over the days and weeks. When you are at work you will begin to say what you really think. You will start to tell your wife, or your husband, or your children, or your parents, what you really want and need. ”\n",
              "reference": "",
              "highlight": false
            },
            {
              "title": "Rule 7 - Pursue what is meaningful (Not what is expedient)",
              "description": "“Meaning is the ultimate balance between, on the one hand, the chaos of transformation and possibility and on the other, the discipline of pristine order, whose purpose is to produce out of the attendant chaos a new order that will be even more immaculate, and capable of bringing forth a still more balanced and productive chaos and order. Meaning is the Way, the path of life more abundant, the place you live when you are guided by Love and speaking Truth and when nothing you want or could possibly want takes any precedence over precisely that.”",
              "reference": "",
              "highlight": false
            },
            {
              "title": "Rule 8 - Tell the truth (Or at least don't lie)",
              "description": "“If your life is not what it could be, try telling the truth. If you cling desperately to an ideology or wallow in nihilism, try telling the truth. If you feel weak and rejected, and desperate, and confused, try telling the truth. In Paradise, everyone speaks the truth. That is what makes it Paradise.”",
              "reference": "",
              "highlight": false
            },
            {
              "title": "Rule 9 - Assume that the person you are listening to might know something you don't",
              "description": "“So, listen, to yourself and to those with whom you are speaking. Your wisdom then consists not of the knowledge you already have, but the continual search for knowledge, which is the highest form of wisdom. It is for this reason that the priestess of the Delphic Oracle in ancient Greece spoke most highly of Socrates, who always sought the truth. She described him as the wisest living man - because he knew that what he knew was nothing.”",
              "reference": "",
              "highlight": false
            },
            {
              "title": "Rule 10 - Be precise in your speech",
              "description": "“Say what you mean, so that you can find out what you mean. Act out what you say, so you can find out what happens. Then pay attention. Note your errors. Articulate them. Strive to correct them. That is how you discover the meaning of your life. That will protect you from the tragedy of your life. How could it be otherwise?”",
              "reference": "",
              "highlight": false
            },
            {
              "title": "Rule 11 - Do not bother children when they are skateboarding",
              "description": "“The spirit that interferes when boys are trying to become men is, therefore, no more friend to woman than it is to man. It will object, just as vociferously and self-righteously (“you can’t do it, it’s too dangerous”) when little girls try to stand on their own two feet. It negates consciousness. It’s antihuman, desirous of failure, jealous, resentful and destructive.”",
              "reference": "",
              "highlight": false
            },
            {
              "title": "Rule 12 - Pet a cat when you encounter one on the street",
              "description": "“If you pay careful attention, even on a bad day, you may be fortunate enough to be confronted with small opportunities of just that sort. Maybe you will see a little girl dancing on the street because she is all dressed up in a ballet costume. Maybe you will have a particularly good cup of coffee in a café that cares about their customers. Maybe you can steal ten or twenty minutes to do some little ridiculous thing that distracts you or reminds you that you can laugh at the absurdity of existence.”",
              "reference": "",
              "highlight": false
            }
          ],
          "section_notes": [],
          "last_updated": today
        },
        {
          "id": "A91urgEACAAJ",
          "reading_now": false,
          "favorite": false,
          "closing_thoughts": {
            "review": "",
            "rating": 0
          },
          "book_summary": "",
          "lessons": [],
          "section_notes": [],
          "last_updated": this_month
        },
        {
          "id": "_NRmDwAAQBAJ",
          "reading_now": false,
          "favorite": false,
          "closing_thoughts": {
            "review": "Super zen - it's about the journey, not the destination.",
            "rating": 5
          },
          "book_summary": "A quick read but a classic for a reason, I would definitely recommend to a friend.",
          "lessons": [],
          "section_notes": [],
          "last_updated": this_week
        },
        {
          "id": "mbobFPY4W1sC",
          "reading_now": false,
          "favorite": false,
          "closing_thoughts": {
            "review": "Very practical and really enjoying the insights so far.",
            "rating": 5
          },
          "book_summary": "vag·a·bond - noun: \n(1) The act of leaving behind the orderly world to travel independently for an extended period of time.\n(2) A privately meaningful manner of travel that emphasizes creativity, adventure, awareness, simplicity, discovery, independence, realism, self-reliance, and the growth of the spirit. \n(3) A deliberate way of living that makes freedom to travel possible.",
          "lessons": [],
          "section_notes": [],
          "last_updated": this_month
        },
        {
          "id": "_gA_DwAAQBAJ",
          "reading_now": true,
          "favorite": false,
          "closing_thoughts": {
            "review": "",
            "rating": 0
          },
          "book_summary": "",
          "lessons": [],
          "section_notes": [],
          "last_updated": this_week
        },
        {
          "id": "VGZ7HbvqenkC",
          "reading_now": false,
          "favorite": false,
          "closing_thoughts": {
            "review": "Beautifully written.",
            "rating": 5
          },
          "book_summary": "",
          "lessons": [],
          "section_notes": [],
          "last_updated": today
        },
        {
          "id": "rgpHvwEACAAJ",
          "reading_now": true,
          "favorite": false,
          "closing_thoughts": {
            "review": "",
            "rating": 0
          },
          "book_summary": "",
          "lessons": [
            {
              "title": "1. Start Thy Purse To Fattening",
              "description": "Start saving money - nobody will do it for you! Pay yourself first.",
              "reference": "",
              "highlight": false
            },
            {
              "title": "2. Control Thy Expenditures",
              "description": "Don't spend any more than you need.",
              "reference": "",
              "highlight": false
            },
            {
              "title": "3. Make Thy Gold Multiply",
              "description": "Invest, and invest it wisely. ",
              "reference": "",
              "highlight": false
            },
            {
              "title": "4. Guard Thy Treasures From Loss",
              "description": "Sounds like common sense but - don't lose money. Avoid any investments that sound too good to be true.",
              "reference": "",
              "highlight": false
            },
            {
              "title": "5. Make of Thy Dwelling A Profitable Investment",
              "description": "Own your home, own equity.",
              "reference": "",
              "highlight": false
            },
            {
              "title": "6. Ensure A Future Income",
              "description": "Plan accordingly.",
              "reference": "",
              "highlight": false
            },
            {
              "title": "7. Increase Thy Ability To Learn",
              "description": "Get better every day - continuous learning.",
              "reference": "",
              "highlight": false
            }
          ],
          "section_notes": [],
          "last_updated": yesterday
        },
        {
          "id": "8bbMjwEACAAJ",
          "reading_now": true,
          "favorite": false,
          "closing_thoughts": {
            "review": "My second or third time going through this book - absolutely incredible writing on setting goals and turning them into reality.",
            "rating": 5
          },
          "book_summary": "I really enjoyed the following self-analysis questions and think I should revisit these often (great for journaling):\n\n     - Do you complain often of \"feeling bad,\" and if so, what is the cause?\n\n     - Do you find fault with other people at the slightest provocation?\n\n     - Do you frequently make mistakes in your work, and if so, why?\n\n     - Are you sarcastic and offensive in your conversation?\n\n     - Do you deliberately avoid the association of anyone, and if so, why?\n\n     - Do you suffer frequently with indigestion? If so, what is the cause?\n\n     - Does life seem futile and the future hopeless to you? If so, why?\n\n     - Do you like your occupation? If not, why?\n\n     - Do you often feel self-pity, and if so why?\n\n     - Are you envious of those who excel you?\n\n     - To which do you devote most time, thinking of Success, or of Failure?\n\n     - Are you gaining or losing self-confidence as you grow older?\n\n     - Do you learn something of value from all mistakes?\n\n     - Are you permitting some relative or acquaintance to worry you? If so, why?\n\n     - Are you sometimes \"in the clouds\" and at other times in the depths of despondency?\n\n     - Who has the most inspiring influence upon you? What is the cause?\n\n     - Do you tolerate negative or discouraging influences which you can avoid?\n\n     - Are you careless of your personal appearance? If so, when and why?\n\n     - Have you learned how to \"drown your troubles\" by being too busy to be annoyed by them?\n\n     - Would you call yourself a \"spineless weakling\" if you permitted others to do your thinking for you?\n\n     - Do you neglect internal bathing until auto-intoxication makes you ill-tempered and irritable?\n\n     - How many preventable disturbances annoy you, and why do you tolerate them?\n\n     - Do you resort to liquor, narcotics, or cigarettes to \"quiet your nerves\"? If so, why do you not try - will-power instead?\n\n     - Does anyone \"nag\" you, and if so, for what reason?\n\n     - Do you have a DEFINITE MAJOR PURPOSE, and if so, what is it, and what plan have you for achieving it?\n\n     - Do you suffer from any of the Six Basic Fears? If so, which ones?\n       (Poverty, Criticism, Ill Health, Loss of love, Old age, Death) \n\n     - Have you a method by which you can shield yourself against the negative influence of others?\n",
          "lessons": [],
          "section_notes": [
           
          ],
          "last_updated": this_week
        }
      ]
    }  
  }

