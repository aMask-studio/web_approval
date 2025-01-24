import InfoBlock from "../components/InfoBlock";

const ContactsPage = () => {
    // frameborder="0"
    return <div className="page gap-5">
        <InfoBlock title={"Контакты"}>
            <a className='link' href="tel:+73912936757" >Тел. приемной: 8 (391) 293-67-57</a><br/>
            <a className='link' href="tel:2333040">Аварийная служба: 233-30-40</a><br/>
            <a className='link' href="mailto:uk.soglasie2016@mail.ru">E-mail: uk.soglasie2016@mail.ru</a>
        </InfoBlock>
        <InfoBlock title={"Адрес на карте"}>
            <p className="link">г.Красноярск, ул Семафорная д. 231 (660016)</p>
            <br/>
            <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Aa3477c020ebbb5504b9111740478c7d5988dd5deffb3461b4d716d87fc5654b2&amp;source=constructor" 
            width="100%" height="400"></iframe>
        </InfoBlock>
    </div>
}
export default ContactsPage;