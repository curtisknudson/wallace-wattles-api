// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const axios = require("axios");
const cheerio = require("cheerio");

type Data = {
  quote: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const emersonQuotes = [
    "“Our greatest glory is not in never failing, but in rising up every time we fail.”",
    "“Live in the sunshine, swim the sea, drink the wild air.”",
    "“Without ambition one starts Without work one finishes The prize will not be sent to You have to win it.”",
    "“Nothing great was ever achieved without enthusiasm.”",
    "“Life is a journey, not a destination.”",
    "“It is not the length of life, but the depth.”",
    "“When it is dark enough, you can see the stars.”",
    "“Make the most of yourself….for that is all there is of you.”",
    '“I cannot remember the books I’ve read any more than the meals I have eaten; even so, they have made me."',
    "“Be Be Be kind.”",
    "“Once you make a decision, the universe conspires to make it happen.”",
    "“You cannot do a kindness too soon, for you never know how soon it will be too late.”",
    "“The only way to have a friend is to be one.”",
    "“The only person you are destined to become is the person you decide to be.”",
    "“Don’t be too timid and squeamish about your All life is an The more experiments you make the better.”",
    "“The earth laughs in flowers.”",
    "“A great man is always willing to be little.”",
    "“Peace cannot be achieved through violence, it can only be attained through understanding.”",
    "“To be great is to be misunderstood.”",
    "“Write it on your heart that every day is the best day in the year.”",
    "“Unless you try to do something beyond what you have already mastered, you will never grow.”",
    "“People do not seem to realise that their opinion of the world is also a confession of their character.”",
    "“When friendships are real, they are not glass threads or frost work, but the solidest things we can know.”",
    "“You become what you think about all day long.”",
    '“Character is higher than intellect… A great soul will be strong to live, as well as strong to think."',
    '"Do not go where the path may lead, go instead where there is no path and leave a trail."',
    "“Big jobs usually go to the men who prove their ability to outgrow small ones.”",
    "“To know even one life has breathed easier because you have This is to have succeeded.”",
    "“To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.”",
    "“Self-trust is the first secret of success.”",
    "“Enthusiasm is the mother of effort, and without it nothing great was ever achieved.”",
    "“The ancestor of every action is a thought.”",
    "“The good news is that the moment you decide that what you know is more important than what you have been taught to believe, you will have shifted gears in your quest for Success comes from within, not from without.”",
    "“Most of the shadows of this life are caused by standing in one’s own sunshine.”",
    "“What you are comes to you.”",
    "“The only reward of virtue is virtue; the only way to have a friend is to be one.”",
    '"What you do speaks so loudly that I cannot hear what you say.”',
    "“The health of the eye seems to demand a We are never tired, so long as we can see far enough.”",
    "“This time, like all times, is a very good one, if we but know what to do with it.”",
    "“Life is a succession of lessons which must be lived to be understood.”",
    "“Beauty without grace is the hook without the bait.”",
    "“Before we acquire great power we must acquire wisdom to use it well.”",
    "“People wish to be settled; only as far as they are unsettled is there any hope for them.”",
    "“How much of human life is lost in waiting.”",
    "“The secret in education lies in respecting the student.”",
    "“Nothing is at last sacred but the integrity of your own mind.”",
    "“People destined to meet will do so, apparently by chance, at precisely the right moment.”",
    "“One of the most beautiful compensations in life is that no person can help another without helping themselves.”",
    "“Imagination is a very high sort of seeing.”",
    "“Throw a stone into the stream and the ripples that propagate themselves are the beautiful type of all influence.”",
    "“Happy will the house be in which the relationships are formed from character.”",
    "“Little minds have little worries, big minds have no time for worries.”",
    "“We are always getting ready to live but never living.”",
    "“We are by nature observers, and thereby That is our permanent state.”",
    '“I do not wish more external goods—neither possessions, nor honors, nor powers, nor The gain is apparent; the tax is certain."',
    '"Never lose an opportunity of seeing anything beautiful, for beauty is God\'s handwriting."',
    "“What your heart thinks is great, is The soul’s emphasis is always right.”",
    "“Belief consists in accepting the affirmations of the soul; unbelief, in denying them.”",
    "“What I must do is all that concerns me, not what the people think.”",
    '"God enters by a private door into every individual."',
    "“Nature is reckless of the When she has points to carry, she carries them.”",
    "“Knowledge is the antidote to fear.”",
    "“Economy does not consist in saving the coal, but in using the time while it burns.”",
    '"We must be our own before we can be another’s.”',
    "“Dare to live the life you have dreamed for Go forward and make your dreams come true.”",
    "“We cannot overstate our debt to the past, but the moment has the supreme claim.”",
    "“Without a rich heart, wealth is an ugly beggar.”",
    "“The love that you withhold is the pain that you carry.”",
    '"Good men must not obey the laws too well."',
    '"All mankind love a lover."',
    "“Wise men put their trust in ideas and not in circumstances.”",
    '"Science does not know its debt to imagination."',
    "“Happiness is a perfume you cannot pour on others without getting some on yourself.”",
    "“If we encounter a man of rare intellect, we should ask him what books he reads.”",
    '"The years teach much which the days never know."',
    '"Men love to wonder; that is the seed of science."',
    "“Concentration is the secret of strength in politics, in war, in trade, in short in all management of human affairs.”",
    '"Don\'t be too timid and squeamish about your All life is an experiment."',
    "“The sum of wisdom is that time is never lost that is devoted to work.”",
    '"There is creative reading as well as creative writing."',
    '"A good indignation brings out all one\'s powers."',
    "“He is rich who owns the day, and no one owns the day who allows it to be invaded with fret and anxiety.”",
    '"Let us be silent, that we may hear the whispers of the gods."',
    '"The age of a woman doesn\'t mean a The best tunes are played on the oldest fiddles."',
    "“He cannot be happy and strong until he too lives with nature in the present, above time.”",
    '"Manners require time and nothing is more vulgar than haste."',
    '"We are a puny and fickle Avarice, hesitation, and following are our diseases."',
    '"We aim above the mark to hit the mark."',
    '"People only see what they are prepared to see."',
    '"Every artist was first an amateur."',
    '"Friendship, like the immortality of the soul, is too good to be believed."',
    '"The greatest gift is a portion of thyself."',
    "“Though we travel the world over to find the beautiful, we must carry it with us, or we find it not.”",
    '"Judge of your natural character by what you do in your dreams."',
    '"A friend may well be reckoned the masterpiece of nature."',
    "“A man’s years should not be counted until he has something else to count.”",
    '"As we grow old, the beauty steals inward."',
    "“Shallow men believe in luck or in Strong men believe in cause and effect.”",
    '"All is riddle and the key to a riddle is another riddle."',
    "“All the good of nature is the soul’s, and may be had, if paid for in nature’s lawful coin, that is, by labor which the heart and the head allow.”",
    "“The real and lasting victories are those of peace and not of war.”",
    "\"Who you are speaks so loudly, I can't hear what you're saying.\"",
    '"Flowers... are a proud assertion that a ray of beauty outvalues all the utilities of the world."',
    '"Every man has his own courage, and is betrayed because he seeks in himself the courage of other persons."',
    '"It is one of the blessings of old friends is that you can afford to be stupid with them."',
    '"A man\'s growth is seen in the successive choirs of his friends."',
    "“No great man ever complains of want of opportunity.”",
    '"The first wealth is health."',
    '"Can anything be so elegant as to have few wants, and to serve them one\'s self?"',
    '"Adopt the pace of nature: her secret is patience."',
    "“The last change in our point of view gives the whole world a pictorial air.”",
    '"Hitch your wagon to a star."',
    '"The reward of a thing well done is having done it."',
    '"Fate is nothing but the deeds committed in a prior state of existence."',
    '"Beauty without expression is boring."',
    '"In the morning, a man walks with his whole body; in the evening, only in his legs."',
    '"We are rich through only what we give and poor only through what we refuse."',
    '"The sum of wisdom is that time is never lost that is devoted to work."',
    '"With the past, I have nothing to do; nor with the I live now."',
    '"All I have seen teaches me to trust the creator for all I have not seen."',
    '"The revelation of thought takes men out of servitude and into freedom."',
    '"The desire for gold is not It is for the means for freedom and benefit."',
    '"A man is usually more careful of his money than he his is principles."',
    '"An ounce of action is worth a ton of theory."',
    '"Beauty is an outward gift, which is seldom despised, except by those to whom it is refused."',
    '"Win as if you were used to it; lose as if you enjoyed it for a change."',
    '"The fox has many The hedgehog has but But that is the best of all."',
    '"Fiction reveals truth that reality obscures."',
    "“All I have seen teaches me to trust the Creator for all I have not seen.”",
    '"What is a weed? A plant whose virtues have never been discovered."',
    '"Bad times have a scientific These are occasions a good learned would not miss."',
    '"The older you get, the older you want to get."',
    '"Character is higher than intellect."',
    '"Nothing astonishes men so much as common sense and plain dealing."',
    '"Doing well is the result of doing That\'s what capitalism is all about."',
    '"As soon as there is life, there is danger."',
    '"People with great gifts are easy to find, but symmetrical and balanced ones never."',
    '"Make yourself necessary to somebody."',
    '"In skating over thin ice, our safety is speed."',
    '"Every man I meet is in some way my superior."',
    '"Knowledge is knowing that we cannot know."',
    '"Some books leave us free and some books make us free."',
    "“Make your own Select and collect all the words and sentences that in all your readings have been to you like the blast of a trumpet.”",
    '"People that seem so glorious are all show; underneath, they are like everyone else."',
    '"There is a tendency for things to right themselves."',
    "“Our chief want is someone who will inspire us to be what we know we could be.”",
    '"He who is not everyday conquering some fear has not learned the secret of life."',
    '"What lies behind you and what lies in front of you, pales in comparison to what lies inside of you."',
    '"For every minute you remain angry, you give up sixty seconds of peace of mind."',
    "“A hero is no braver than an ordinary man, but he is brave five minutes longer.”",
    "“The purpose of life is not to be It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well.”",
  ];
  const randomNumber = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const quote = emersonQuotes[randomNumber(0, emersonQuotes.length)];
  res.status(200).json({
    quote,
  });
}
