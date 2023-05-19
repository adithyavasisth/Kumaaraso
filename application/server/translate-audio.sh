echo Deleting old audio wav files...
find . -name "*.wav" -type f -delete

echo Generating English Audio...
gtts-cli "Hi there. Welcome to Kumaaraso, using Artemisia to fight Malaria." -l en -o ./voice-xml/en/audio/en-welcome.mp3
gtts-cli "Press 1 for English. Press 2 for French. Press 3 for Bambara." -l en -o ./voice-xml/en/audio/en-language.mp3
gtts-cli "Sorry, I didn't understand that." -l en -o ./voice-xml/en/audio/en-invalid.mp3
gtts-cli "Press 1 to learn about farming artemisia. Press 2 to ask questions and listen to answers. Press 9 to change the language." -l en -o ./voice-xml/en/audio/en-menu.mp3
gtts-cli "You chose to learn about farming Artemisia. Press 1 to learn about preparing land for Artemisia. Press 2 to learn about planting and caring for Artemisia. Press 3 to learn about harvesting and storing Artemisia. Press 4 to return to the main menu. Press 9 to change the language." -l en -o ./voice-xml/en/audio/en-farming.mp3
gtts-cli "Artemisia can be grown in pots or open ground. Remove stones and weeds, create a barrier so cattle and animals do not enter, and plow only if you need to. If it is the rainy season, dig drainage channels to drain the soil. Any kind of straw, grass, leftovers from cereal crops, cut or crushed corn plants, and decomposed palm oil leaves can be used as organic fertilizer or mulch. Avoid woody material because it attracts termites." -l en -o ./voice-xml/en/audio/en-cultivation.mp3
gtts-cli "Artemisia plants need at least 1 meter between them because they grow 1 meter wide. For example, plant them 1 meter apart in a row, with a 2 meter gap for the next row.  Alternating artemisia with trees and other crops is good for keeping soil nutrition balanced. Artemisia is fragile in the first few months. Water it in the morning and evening every day for the first three months. Use the morning and evening to avoid plant water loss from the daytime heat. After three months, it can be watered 2 or 3 times a week." -l en -o ./voice-xml/en/audio/en-planting.mp3
gtts-cli "Do not harvest in the rainy season because the moisture creates bacteria and mold. Harvest in the driest season, in the middle of the day, if possible, and dry the harvested plant immediately. Leave the finest and best plants to flower to collect their seeds. Harvested plants can be used to make medicines, tea, soaps, and more." -l en -o ./voice-xml/en/audio/en-harvesting.mp3
gtts-cli "You can ask your question, which will be answered by experts once every week, or listen to answers to community questions. Press 1 to ask your questions. Press 2 to listen to answers. Press 3 to go back to the main menu. Press 9 to change the language." -l en -o ./voice-xml/en/audio/en-questions.mp3
gtts-cli "Please do not share any personally identifying information. Record your question after the beep. Press any key to stop recording." -l en -o ./voice-xml/en/audio/en-ask.mp3
gtts-cli "Your question is" -l en -o ./voice-xml/en/audio/en-confirm.mp3
gtts-cli "Thank you for your question. It will be answered by experts once every week." -l en -o ./voice-xml/en/audio/en-asked.mp3
gtts-cli "You are listening to the answers from the Radio to the frequently asked questions." -l en -o ./voice-xml/en/audio/en-listen.mp3
gtts-cli "That is all the answers for this week. Please call back next week for more answers." -l en -o ./voice-xml/en/audio/en-listened.mp3
echo Done generating English Audio.

echo Generating French Audio...
gtts-cli "Bonjour. Bienvenue à Kumaaraso, utilisant Artemisia pour lutter contre le paludisme." -l fr -o ./voice-xml/fr/audio/fr-welcome.mp3
gtts-cli "Appuyez sur 1 pour l'anglais. Appuyez sur 2 pour le français. Appuyez sur 3 pour le bambara." -l fr -o ./voice-xml/fr/audio/fr-language.mp3
gtts-cli "Désolé, je n'ai pas compris." -l fr -o ./voice-xml/fr/audio/fr-invalid.mp3
gtts-cli "Appuyez sur 1 pour en savoir plus sur la culture de l'armoise. Appuyez sur 2 pour poser des questions et écouter les réponses. Appuyez sur 9 pour changer de langue." -l fr -o ./voice-xml/fr/audio/fr-menu.mp3
gtts-cli "Vous avez choisi d'apprendre à cultiver l'Artemisia. Appuyez sur 1 pour en savoir plus sur la préparation du terrain pour l'Artemisia. Appuyez sur 2 pour en savoir plus sur la plantation et l'entretien de l'Artemisia. Appuyez sur 3 pour en savoir plus sur la récolte et le stockage de l'Artemisia. Appuyez sur 4 pour revenir au menu principal. Appuyez sur 9 pour changer de langue." -l fr -o ./voice-xml/fr/audio/fr-farming.mp3
gtts-cli "L'artemisia peut être cultivée en pot ou en pleine terre. Enlevez les pierres et les mauvaises herbes, créez une barrière pour empêcher le bétail et les animaux d'entrer et ne labourez que si vous en avez besoin. Si c'est la saison des pluies, creusez des canaux de drainage pour drainer le sol. Tout type de paille, d'herbe, de restes de cultures céréalières, de plants de maïs coupés ou broyés et de feuilles de palmier à huile décomposées peut être utilisé comme engrais organique ou paillis. Évitez les matériaux ligneux car ils attirent les termites." -l fr -o ./voice-xml/fr/audio/fr-cultivation.mp3
gtts-cli "Les plantes d'Artemisia ont besoin d'au moins 1 mètre entre elles car elles poussent sur 1 mètre de large. Par exemple, plantez-les à 1 mètre de distance dans une rangée, avec un espace de 2 mètres pour la rangée suivante. Alterner l'artemisia avec des arbres et d'autres cultures est bon pour maintenir l'équilibre nutritionnel du sol. L'armoise est fragile les premiers mois. Arrosez-le matin et soir tous les jours pendant les trois premiers mois. Utilisez le matin et le soir pour éviter la perte d'eau des plantes à cause de la chaleur diurne. Après trois mois, il peut être arrosé 2 ou 3 fois par semaine." -l fr -o ./voice-xml/fr/audio/fr-planting.mp3
gtts-cli "Ne pas récolter pendant la saison des pluies car l'humidité crée des bactéries et des moisissures. Récoltez à la saison la plus sèche, en milieu de journée si possible, et séchez immédiatement la plante récoltée. Laissez fleurir les plus belles et les meilleures plantes pour récolter leurs graines. Les plantes récoltées peuvent être utilisées pour fabriquer des médicaments, du thé, des savons, etc." -l fr -o ./voice-xml/fr/audio/fr-harvesting.mp3
gtts-cli "Vous pouvez poser votre question, à laquelle des experts répondront une fois par semaine, ou écouter les réponses aux questions de la communauté. Appuyez sur le 1 pour poser vos questions. Appuyez sur 2 pour écouter les réponses. Appuyez sur 3 pour revenir au menu principal. Appuyez sur 9 pour changer de langue." -l fr -o ./voice-xml/fr/audio/fr-questions.mp3
gtts-cli "VVeuillez ne pas partager d'informations d'identification personnelle. Enregistrez votre question après le bip. Appuyez sur une touche pour arrêter l'enregistrement." -l fr -o ./voice-xml/fr/audio/fr-ask.mp3
gtts-cli "Votre question est" -l fr -o ./voice-xml/fr/audio/fr-confirm.mp3
gtts-cli "Merci pour votre question. Des experts y répondront une fois par semaine. " -l fr -o ./voice-xml/fr/audio/fr-asked.mp3
gtts-cli "Vous écoutez les réponses de la Radio aux questions fréquemment posées." -l fr -o ./voice-xml/fr/audio/fr-listen.mp3
gtts-cli "Voilà toutes les réponses pour cette semaine. Merci de rappeler la semaine prochaine pour plus de réponses." -l fr -o ./voice-xml/fr/audio/fr-listened.mp3
echo Done generating French Audio.

echo Generating Bambara Audio...
gtts-cli "Ani ce yan. Aw ni ce Kumaaraso, ka Artemisia kɛ ka Sumayabana kɛlɛ." -l es -o ./voice-xml/bm/audio/bm-welcome.mp3
gtts-cli "1 digi tubabukan na. 2 digi walasa ka faransikan sɔrɔ. 3 digi bamanankan na." -l es -o ./voice-xml/bm/audio/bm-language.mp3
gtts-cli "Baasi tɛ, n ma o faamu." -l es -o ./voice-xml/bm/audio/bm-invalid.mp3
gtts-cli "Aw bɛ 1 digi walasa ka sɛnɛ kɛcogo dɔn artemisia kan. 2 digi walisa ka ɲininkaliw kɛ ani ka jaabiw lamɛn. 9 digi walasa ka kan Changer." -l es -o ./voice-xml/bm/audio/bm-menu.mp3
gtts-cli "I y’a sugandi ka Artemisia sɛnɛcogo dɔn. 1 digi walasa ka dugukolo labɛncogo dɔn Artemisi kama. Aw bɛ 2 digi walasa ka Artemisia sɛnɛni ni a ladonni dɔn. Aw bɛ 3 digi walasa ka Artemisia suman tigɛcogo n’a maracogo dɔn. 4 digi walasa ka segin menu principal kan. 9 digi walasa ka kan Changer." -l es -o ./voice-xml/bm/audio/bm-farming.mp3
gtts-cli "Artemisia bɛ se ka sɛnɛ dagaw kɔnɔ walima yɔrɔ dafalenw na. Aw bɛ kabakurunw ni binjuguw bɔ, ka barika da walasa misiw ni baganw kana don, ka sɛnɛ kɛ dɔrɔn ni aw mago bɛ a la. Ni sanji waati don, aw bɛ jibɔyɔrɔw sɔgɔ walasa ka dugukolo ji bɔ. Bɔgɔ suguya o suguya, bin suguya o suguya, sɛnɛfɛnw tolenw, ɲɔ jiri tigɛlenw walima u mugulenw, ani jirisun tulu tolilenw, olu bɛ se ka kɛ bagaji walima jirisunba ye. Aw bɛ aw yɛrɛ tanga jirifɛnw ma barisa a bɛ wuluw sama." -l es -o ./voice-xml/bm/audio/bm-cultivation.mp3
gtts-cli "Artemisia jiriw mago bɛ mɛtɛrɛ 1 la u ni ɲɔgɔn cɛ barisa u bonya ye mɛtɛrɛ 1 ye. Misali la, aw bɛ u turu u ni ɲɔgɔn cɛ mɛtɛrɛ 1 ɲɔgɔn na, ka mɛtɛrɛ 2 bɔ ɲɔgɔn na jirisun nata kama. Ni aw ye joli-sira-funu ɲɔgɔn falen falen ni jiriw ni sɛnɛfɛn wɛrɛw ye, o ka ɲi dugukolo balocogo ɲuman sabatili la. Artemisia bɛ se ka tiɲɛ kalo fɔlɔw la. Aw bɛ ji kɛ a la sɔgɔma ni wula fɛ don o don kalo saba fɔlɔ kɔnɔ. Aw bɛ baara kɛ ni sɔgɔma ni wula ye walasa jiriw kana ji bɔ tile funteni fɛ. Kalo saba tɛmɛnen kɔ, a bɛ se ka ji kɛ a la siɲɛ 2 walima siɲɛ 3 dɔgɔkun kɔnɔ." -l es -o ./voice-xml/bm/audio/bm-planting.mp3
gtts-cli "Aw kana suman tigɛ sanji waati la barisa jisuma bɛ banakisɛw ni nɔgɔw lase mɔgɔ ma. Aw bɛ suman tigɛ ja waati la, tile cɛmancɛ la, n’a bɛ se ka kɛ, ka jiri tigɛlen ja joona. Aw bɛ jiri ɲumanw ni jiri ɲumanw to u ka falen walasa k’u kisɛw lajɛ. Fɛnɲɛnɛma tigɛlenw bɛ se ka kɛ ka furaw, te, safinɛw, ani fɛn wɛrɛw dilan." -l es -o ./voice-xml/bm/audio/bm-harvesting.mp3
gtts-cli "Aw bɛ se k’aw ka ɲininkali kɛ, min bɛna jaabi dɔnnikɛlaw fɛ siɲɛ kelen dɔgɔkun o dɔgɔkun, walima ka sigida ɲininkaliw jaabiw lamɛn. 1 digi walasa k’i ka ɲininkaliw kɛ. 2 digi walasa ka jaabiw lamɛn. 3 digi walasa ka segin menu principal kɔnɔ. 9 digi walasa ka kan Changer." -l es -o ./voice-xml/bm/audio/bm-questions.mp3
gtts-cli "Aw kana kunnafoni si di aw ma min bɛ aw yɛrɛ dɔn. I ka ɲininkali sɛbɛn bip kɔfɛ. Butɔn o butɔn digi walisa ka fɔli dabila." -l es -o ./voice-xml/bm/audio/bm-ask.mp3
gtts-cli "I ka ɲininkali ye" -l es -o ./voice-xml/bm/audio/bm-confirm.mp3
gtts-cli "Aw ni ce aw ka ɲininkali la. A bɛna jaabi dɔnnikɛlaw fɛ siɲɛ kelen dɔgɔkun o dɔgɔkun." -l es -o ./voice-xml/bm/audio/bm-asked.mp3
gtts-cli "I bɛ ka jaabiw lamɛn ka bɔ Arajo la ɲininkali minnu bɛ kɛ tuma caman na." -l es -o ./voice-xml/bm/audio/bm-listen.mp3
gtts-cli "O de ye nin dɔgɔkun in jaabiw bɛɛ ye. Aw ye segin ka wele dɔgɔkun nata la walasa ka jaabi wɛrɛw sɔrɔ." -l es -o ./voice-xml/bm/audio/bm-listened.mp3
echo Done generating Bambara audio.

# convert mp3 to wav
echo Converting mp3 to wav...
for f in $(find . -name "*.mp3"); do ffmpeg -i $f -acodec pcm_s16le -ac 1 -ar 16000 ${f/mp3/wav}; done
# remove mp3

echo Removing mp3 files...
find . -name "*.mp3" -type f -delete
echo Done converting mp3 to wav.

