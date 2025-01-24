import './index.scss';

const Footer = () => {
    return <div className="footer">
        <div className='main'>
            <div></div>
            <div>
                <p className='subtitle'>Ссылки</p>
                <ul>
                    {/* <li><a href='#'>Мероприятия</a></li> */}
                    <li><a href='https://fssp.gov.ru/iss/ip' target='_blank'>Узнать о долге</a></li>
                    <li><a href='https://online.sberbank.ru/CSAFront/index.do#/' target='_blank'>Оплата ЖКУ</a></li>
                    <li><a href='/documents'>Документы</a></li>
                    <li><a href='/#about-company'>Информация</a></li>
                    <li><a href='https://yandex.ru/maps/org/soglasiye/191420771501/reviews' target='_blank'>Отзывы</a></li>
                    <li><a href='/admin/login'>Админ панель</a></li>
                </ul>
            </div>
            <div style={{textAlign:"end"}}>
                <p className='subtitle'>Контакты</p>
                <p>
                    Адрес: Россия, г. Красноярск,<br/>
                    660016 ул. Семафорная, 231<br/><br/>
                    Приемная тел.: 8 (391) 293-67-57<br/><br/>
                    E-mail: uk.soglasie2016@mail.ru
                </p>
            </div>
        </div>
        <div className='second'>
            <p>Разработано мною</p>
            <p>Правообладатель ООО УК "Согласие" 2024 г.</p>
        </div>
    </div>
}
export default Footer;