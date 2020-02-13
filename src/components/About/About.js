import React from "react";
import './About.scss';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class About extends React.Component {
    render = () => {
        return (
            <div className={'about'}>
                <div>
                    <h4>О проекте</h4>

                    <div className={'chapter'}>
                        <p>Этот проект посвящён парафразу "Метафизики" Аристотеля. Я хочу упростить стиль лекций, потеряв при этом минимум смысла.</p>
                    </div>

                    <h4>Что</h4>

                    <div className={'chapter'}>
                        <p>"Метафизика" Аристотеля - это набор лекций, записанных его учениками. В нём он рассказывает о своём взгляде на мир - диалектике.</p>

                        <p>Диалектика - это то, что сейчас мы называем здравым смыслом. То, как надо мыслить.</p>

                        <p>Парафраз - это вольное изложение, пересказ.</p>

                        <p>Получается, этот проект посвящён пересказу лекций Аристотеля о здравом смысле.</p>
                    </div>

                    <h4>Зачем</h4>

                    <div className={'chapter'}>
                        <p>Есть четыре перевода "Метафизики" на русский язык.</p>

                        <ul>
                            <li>Первый - незавершённый перевод первых пяти книг от П. Первова и В. Розанова от 1895 года.</li>
                            <li>Второй - перевод тринадцатой и четырнадцатой книг от А.Ф. Лосева от 1929 года.</li>
                            <li>Третий и основной - перевод с древнегреческого от С.И. Еремеева и А.В. Кубицкого 1934 года (ISBN 5-89329-503-X)</li>
                            <li>Четвёртый - перевод с древнегреческого А. Маркова 2018 года (ISBN 978-5-386-10325-5)</li>
                        </ul>

                        <p>В чём проблемы этих переводов? Первые два незавершены, вторые два мне очень сложно читать. Я предполагаю, что эти переводы были подстрочными: стремящимися не исказить текст оригинала. Это отдельный вид переводов, и то, что их сложно воспринимать - это не их вина. Они служат другой цели.</p>

                        <p>Перевод Маркова критикуют за небрежность, поэтому за основу я взял Кубицкого. Примечания к нему я собирал из разных изданий: много - не мало.</p>

                        <p>Когда я начал читать "Метафизику", я понял две вещи. Во-первых, что книга невероятна полезна. А во-вторых, что текст о диалектике сложнее самой диалектики. Я решил найти что-нибудь, что может мне помочь прочитать "Метафизику".</p>

                        <p>Об Аристотеле есть несколько видов работ:</p>

                        <ul>
                            <li>Самые понятные - лекции, сжато пересказывающие суть диалектики. Как дополнительный материал - прекрасно, но я хочу читать Аристотеля.</li>
                            <li>Второй по понятности - это исторические исследования про древнюю Грецию. Аналогично: полезно, но это не Аристотель.</li>
                            <li>Вольные сочинения на тему: статьи, рассуждения, трактовки. В большинстве своём, они написаны специалистами для специалистов, поэтому я с трудом могу понять, о чём в них идёт речь.</li>
                            <li>Аудиокниги. Максимально бесполезная вещь, я считаю. Лучше рисовать картинки.</li>
                        </ul>

                        <p>Я не нашёл ни одного разбора "Метафизики" по абзацам или хотя бы по главам на русском языке. Ближе всех к этому подошёл "Аристотель для всех" М. Адлера, но он сильнее, чем мне надо, отходит в сторону упрощения.</p>

                        <p>Ещё есть <a href={'https://archive.org/details/in.ernet.dli.2015.190825'}>W.D. Ross - Aristotle's Metaphysics</a>. Это подробный перевод с древнегреческого на английский, парафраз английского перевода, куча примечаний - и всё в одной книге. Очень круто.</p>

                        <p>Я решил: пока читаю Аристотеля, я буду записывать абзац за абзацем так, как я их понял.</p>
                    </div>

                    <h4>Кто</h4>
                    <div className={'chapter'}>
                        <p>Я не имею должного образования, чтобы утверждать, что я написал что-то осмысленное. Парафраз я делаю в меру своего разумения и лишь как отправную точку для изучения.</p>
                    </div>

                    <h4>Как</h4>

                    <div className={'chapter'}>
                        <p>Я разбил текст "Метафизики" на три части. Первая - перевод 1934 года. Третья - мой парафраз. Между ними - вторая: примечания к обоим частям.</p>

                        <p>В тексте будут встречаться анахронизмы. Аристотель в парафразе говорит современными нам терминами. Это позволяет одновременно и сократить, и упростить текст. Простой пример: Аристотель часто говорит "сам-по-себе объект". Это же понятие мы знаем как "абстрактный объект". В качестве другого примера я предлагаю первую книгу, <a href="/books/b1#origin_b1_c9">девятую главу</a>, четвёртый абзац оригинала. Без привлечения современного языка это просто ад какой-то.</p>

                        <p>Вообще, у "Метафизики" надо бы первой читать пятую книгу. Она целиком посвящена базисным определениям. Начиная парафраз, я этого не знал, поэтому живём вот так вот.</p>
                    </div>

                    <h4>ЧаВо</h4>

                    <div className={'chapter faq'}>
                        <h5>Я нашёл опечатку, ошибку / Ты неправильно понял оригинал / Есть идея</h5>
                        <p>Пишите: справа указаны контакты. Если правда мой косяк - поправлю.</p>

                        <h5>Хочу помочь в переводе/разработке</h5>
                        <p><a href={'https://github.com/snowinmars/aristotel.paraphrase'}>GitHub</a></p>

                        <h5>Хочу закинуть денег</h5>
                        <p>Не надо.</p>
                    </div>
                </div>
                <div>
                    <h5>Контакты</h5>

                    <div className={'chapter contacts'}>
                        <div>
                            <span>Telegram: <a href="https://t.me/snowinmars">@snowinmars</a></span>
                            <CopyToClipboard text={'@snowinmars'}>
                                <i className="material-icons">
                                    file_copy
                                </i>
                            </CopyToClipboard>
                        </div>

                        <div>
                            <span>GitHub: <a href="https://github.com/snowinmars">snowinmars</a></span>
                            <CopyToClipboard text={'snowinmars'}>
                                <i className="material-icons">
                                    file_copy
                                </i>
                            </CopyToClipboard>
                        </div>

                        <div>
                            <span>Email: <a href="mailto:snowinmars@yandex.ru">snowinmars@yandex.ru</a></span>
                            <CopyToClipboard text={'snowinmars@yandex.ru'}>
                                <i className="material-icons">
                                    file_copy
                                </i>
                            </CopyToClipboard>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default About;
