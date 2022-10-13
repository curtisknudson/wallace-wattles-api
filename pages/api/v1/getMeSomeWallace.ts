// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  quote: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const wallaceQuoteArray = [
    "THOUGHT is the only power which can produce tangible riches from the Formless Substance. The stuff from which all things are made is a substance which thinks, and a thought of form in this substance produces the form.",

    "Original Substance moves according to its thoughts; every form and process you see in nature is the visible expression of a thought in Original Substance.",

    "Every thought of form, held in thinking Substance, causes the creation of the form",

    "No thought of form can be impressed upon Original Substance without causing the creation of the form.",

    "Man is a thinking center, and can originate thought. All the forms that man fashions with his hands must first exist in his thought; he cannot shape a thing until he has thought that thing.",

    `There is a thinking stuff from which all things are made, and which, in its original state, permeates, penetrates, and fills the interspaces of the universe. A thought, in this substance, Produces the thing that is imaged by the thought.`,

    "Man can form things in his thought, and, by impressing his thought upon formless substance, can cause the thing he thinks about to be created.",

    "Every man has the natural and inherent power to think what he wants to think, but it requires far more effort to do so than it does to think the thoughts which are suggested by appearances. To think according to appearance is easy; to think truth regardless of appearances is laborious, and requires the expenditure of more power than any other work man is called upon to perform.",

    "To think health when surrounded by the appearances of disease, or to think riches when in the midst of appearances of poverty, requires power; but he who acquires this power becomes a MASTER MIND.",

    "Every living thing must continually seek for the enlargement of its life, because life, in the mere act of living, must increase itself.",

    "That which makes you want more money is the same as that which makes the plant grow; it is Life, seeking fuller expression.",

    "The One Substance desires to live more in you; hence it wants you to have all the things you can use.",

    `The universe desires you to have everything you want to have. Nature is friendly to your plans. Everything is naturally for you. Make up your mind that this is true.`,

    "You can make the most of yourself only by getting rich; so it is right and praiseworthy that you should give your first and best thought to the work of acquiring wealth.",

    `You are to become a creator, not a competitor; you are going to get what you want, but in such a way that when you get it every other man will have more than he has now.`,

    "Look always at the limitless riches in Formless Substance, and KNOW that they are coming to you as fast as you can receive and use them.",

    "Give every man more in use value than you take from him in cash value; then you are adding to the life of the world by every business transaction.",

    "Do not forget for a moment that the Thinking Substance is through all, in all, communicating with all, and can influence all.",

    `You need not hesitate about asking largely; "it is your Father's pleasure to give you the kingdom, " said Jesus.`,

    "Original Substance wants to live all that is possible in you, and wants you to have all that you can or will use for the living of the most abundant life.",

    "The desire you feel for the possession of riches is one with the desire of Omnipotence for more complete expression.",

    "The more gratefully we fix our minds on the Supreme when good things come to us, the more good things we will receive, and the more rapidly they will come",

    "Gratitude draws the mind into closer touch with the source from which the blessings come.",

    "Gratitude will lead your mind out along the ways by which things come",

    "The grateful outreaching of your mind in thankful praise to the Supreme is a liberation or expenditure of force; it cannot fail to reach that to which it addressed, and the reaction is an instantaneous movement towards you.",

    `"Draw nigh unto God, and He will draw nigh unto you." That is a statement of psychological truth.`,

    "The moment you permit your mind to dwell with dissatisfaction upon things as they are, you begin to lose ground.",

    "To dwell upon the inferior is to become inferior and to surround yourself with inferior things.",

    "To fix your attention on the best is to surround yourself with the best, and to become the best.",
    "The Creative Power within us makes us into the image of that to which we give our attention.",

    "We are Thinking Substance, and thinking substance always takes the form of that which it thinks about.",

    "The grateful mind is constantly fixed upon the best; therefore it tends to become the best; it takes the form or character of the best, and will receive the best.",

    "Cultivate the habit of being grateful for every good thing that comes to you; and to give thanks continuously.",

    "Because all things have contributed to your advancement, you should include all things in your gratitude.",

    "Do not waste time thinking or talking about the shortcomings or wrong actions of plutocrats or trust magnates. Their organization of the world has made your opportunity; all you get really comes to you because of them.",

    "You must form a clear and definite mental picture of what you want; you cannot transmit an idea unless you have it yourself.",

    "When you try to impress your wants upon Substance, remember that it must be done by a coherent statement; you must know what you want, and be definite.",

    "All you need is to know what you want, and to want it badly enough so that it will stay in your thoughts.",

    "The more clear and definite you make your picture then, and the more you dwell upon it, bringing out all its delightful details, the stronger your desire will be",

    "Behind your clear vision must be the purpose to realize it; to bring it out in tangible expression.",

    "In the mental realm, enter at once into full enjoyment of the things you want.",

    "Take possession of it, in mind, in the full faith that it is actually yours. Hold to this mental ownership; do not waiver for an instant in the faith that it is real.",

    "The man who can sincerely thank God for the things which as yet he owns only in imagination, has real faith. He will get rich.",

    "The answer to prayer is not according to your faith while you are talking, but according to your faith while you are working.",

    "Hold steady to your vision, with the purpose to cause its creation into solid form, and the faith that you are doing so.",

    "Imagine an environment, and a financial condition exactly as you want them hold to the FAITH that the imaginary is being realized, and to the PURPOSE to realize it.",

    "Substance is friendly to you, and is more anxious to give you what you want than you are to get it.",

    "That is the legitimate use of the will in getting what you want--to use it in holding yourself to the right course.",

    "Keep your mind at home; it can accomplish more there than elsewhere.",

    "Keep your mind at home; it can accomplish more there than elsewhere.",

    "Since belief is all important, it behooves you to guard your thoughts; and as your beliefs will be shaped to a very great extent by the things you observe and think about, it is important that you should command your attention.",

    "If you want to become rich, you must not make a study of poverty.",

    "Health is never to be attained by studying disease and thinking about disease; righteousness is not to be promoted by studying sin and thinking about sin; and no one ever got rich by studying poverty and thinking about poverty.",

    "Do not talk about poverty; do not investigate it, or concern yourself with it. Never mind what its causes are; you have nothing to do with them.",

    "Get rich; that is the best way you can help the poor.",

    `"Let the dead bury their dead," as Jesus said. Put poverty and all things that pertain to poverty completely behind you.`,

    "Think of the riches the world is coming into, instead of the poverty it is growing out of; and bear in mind that the only way in which you can assist the world in growing rich is by growing rich yourself",

    "Give your attention wholly to riches; ignore poverty.",

    "To become really rich is the noblest aim you can have in life, for it includes everything else.",

    "You can aim at nothing so great or noble, I repeat, as to become rich; and you must fix your attention upon your mental picture of riches, to the exclusion of all that may tend to dim or obscure the vision.",

    "It is the truth that there is no such thing as poverty; that there is only wealth.",

    "The very best thing you can do for the whole world is to make the most of yourself.",

    "You can serve God and man in no more effective way than by getting rich; that is, if you get rich by the creative method and not by the competetive one.",

    "By thought you can cause the gold in the hearts of the mountains to be impelled toward you; but it will not mine itself, refine itself, coin itself into double eagles, and come rolling along the roads seeking its way into your pocket.",

    "Your thought makes all things, animate and inanimate, work to bring you what you want; but your personal activity must be such that you can rightly receive what you want when it reaches you.",

    "Act in a Certain Way, so that you can appropriate what is yours when it comes to you",

    "By thought, the thing you want is brought to you; by action you receive it.",

    "If you act in the present with your mind on the future, your present action will be with a divided mind, and will not be effective.",

    "Do not bother as to whether yesterday's work was well done or ill done; do to-day's work well.",

    "Do not try to do tomorrow's work now; there will be plenty of time to do that when you get to it.",

    "Do not wait for a change of environment, before you act; get a change of environment by action.",

    "Do not spend any time in day dreaming or castle building; hold to the one vision of what you want, and act NOW.",

    "You can advance only by being larger than your present place; and no man is larger than his present place who leaves undone any of the work pertaining to that place.",

    "The world is advanced only by those who more than fill their present places.",

    "Much may be depending on your doing some simple act; it may be the very thing which is to open the door of opportunity to very great possibilities.",

    "You can make each act a success, because ALL Power is working with you; and ALL Power cannot fail.",

    "Every action is either strong or weak; and when every one is strong, you are acting in the Certain Way which will make you rich.",

    "Every act can be made strong and efficient by holding your vision while you are doing it, and putting the whole power of your FAITH and PURPOSE into it.",

    "Every success opens the way to other successes, your progress toward what you want, and the progress of what you want toward you, will become increasingly rapid.",

    "Do, every day, all that you can do that day, and do each act in an efficient manner.",

    "Contemplate your picture in your leisure hours until your consciousness is so full of it that you can grasp it instantly.",

    "The desire to do it is proof that you have within you the power which can do it.",

    "There is never any hurry on the creative plane; and there is no lack of opportunity.",

    "No one else is going to beat you to the thing you want to do; there is enough for all.",

    "There is a mind which knows all there is to know; and you can come into close unity with this mind by faith and the purpose to advance in life, if you have deep gratitude.",

    "Do all that you can do in a perfect manner every day, but do it without haste, worry, or fear.",

    "Remember that in the moment you begin to hurry you cease to be a creator and become a competitor",

    "Whenever you find yourself hurrying, call a halt; fix your attention on the mental image of the thing you want, and begin to give thanks that you are getting it.",

    "Increase is what all men and all women are seeking; it is the urge of the Formless Intelligence within them, seeking fuller expression.",

    "The desire for increase is inherent in all nature; it is the fundamental impulse of the universe. All human activities are based on the desire for increase",

    "Every living thing is under the necessity for continuous advancement; where increase of life ceases, dissolution and death set in at once.",

    "The normal desire for increased wealth is not an evil or a reprehensible thing; it is simply the desire for more abundant life; it is aspiration.",

    "You are a creative center, from which increase is given off to all.",

    "Convey the impression of advancement with everything you do, so that all people shall receive the impression that you are an Advancing Man",

    "Do everything that you do in the firm conviction that you are an advancing personality, and that you are giving advancement to everybody.",

    "Feel that you are getting rich, and that in so doing you are making others rich, and conferring benefits on all.",

    "Do not boast or brag of your success, or talk about it unnecessarily; true faith is never boastful.",

    `No better statement of the principle of creative action can be formulated than the favorite declaration of the late "Golden Rule" Jones of Toledo: "What I want for myself, I want for everybody."`,

    "If you can give increase of life to others and make them sensible of the fact, they will be attracted to you, and you will get rich.",

    "The man who is certain to advance is the one who is too big for his place, and who has a clear concept of what he wants to be",

    "There is a Power which never fails to present opportunity to the Advancing Man who is moving in obedience to law",

    "God cannot help helping you, if you act in a Certain Way; He must do so in order to help Himself.",

    "Do not wait for an opportunity to be all that you want to be; when an opportunity to be more than you are now is presented and you feel impelled toward it, take it.",

    "There is no such thing possible in this universe as a lack of opportunities for the man who is living the advancing life.",

    "No matter how tremendous an obstruction may appear at a distance, you will find that if you go on in the Certain Way it will disappear as you approach it, or that a way over, though, or around it will appear.",

    "No man or woman who obeys the law can fail to get rich, any more than one can multiply two by two and fail to get four.",

    "Give no anxious thought to possible disasters, obstacles, panics, or unfavorable combinations of circumstances; it is time enough to meet such things when they present themselves",

    "Guard your speech. Never speak of yourself, your affairs, or of anything else in a discouraged or discouraging way.",

    "Never admit the possibility of failure, or speak in a way that infers failure as a possibility.",

    "Always speak in terms of advancement; to do otherwise is to deny your faith, and to deny your faith is to lose it.",

    "When you make a failure, it is because you have not asked for enough; keep on, and a larger thing then you were seeking will certainly come to you.",

    "Spend most of your leisure time in contemplating your vision, and in cultivating gratitude.",

    "Man may come into full harmony with the Formless Substance by entertaining a lively and sincere gratitude for the blessings it bestows upon him.",

    `Gratitude unifies the mind of man with the intelligence of Substance, so that man's thoughts are received by the Formless.`,

    "Man can remain upon the creative plane only by uniting himself with the Formless Intelligence through a deep and continuous feeling of gratitude.",

    "The man who wishes to get rich must spend his leisure hours in contemplating his Vision, and in earnest thanksgiving that the reality is being given to him.",

    "In order to receive his own when it shall come to him, man must be active; and this activity can only consist in more than filling his present place.",

    "No man can rise to his greatest possible height in talent or soul development unless he has plenty of money",

    "The object of all life is development; and everything that lives has an inalienable right to all the development it is capable of attaining.",

    "Every man should have all that can contribute to the power; elegance, beauty, and richness of life; to be content with less is sinful.",

    "We live for the body, we live for the mind, we live for the soul. No one of these is better or holier than the other; all are alike desirable",

    "THERE is a Science of getting rich, and it is an exact science, like algebra or arithmetic. There are certain laws which govern the process of acquiring riches.",

    "No one is kept in poverty by a shortness in the supply of riches; there is more than enough for all.",

    "The visible supply is practically inexhaustible; and the invisible supply really IS inexhaustible.",

    "Everything you see on earth is made from one original substance, out of which all things proceed.",

    "The Formless Stuff responds to the needs of man; it will not let him be without any good thing.",

    "It is the natural and inherent impulse of life to seek to live more; it is the nature of intelligence to enlarge itself, and of consciousness to seek to extend its boundaries and find fuller expression.",

    "The universe is a great Living Presence, always moving inherently toward more life and fuller functioning.",
  ];

  const randomNumber = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const quote = wallaceQuoteArray[randomNumber(0, wallaceQuoteArray.length)];

  res.status(200).json({ quote: quote });
}
