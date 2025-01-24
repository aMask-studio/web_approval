import { useEffect, useState } from "react";
import { Document } from "../types/Document";
import AddressDocument from "../components/AddressDocument";
import LegislationDocument from "../components/LegislationDocument";
import { GetAddresses } from "../api/GetAddresses";
import { Address } from "../types/Address";

const DocumentsPage = () => {
    const [addressDocuments, setAddressDocuments] = useState<Address[] | undefined>(undefined);
    const [legislationDocuments, setLegislationDocuments] = useState<Document[] | undefined>();
    
    var listAddressDocuments;
    var listLegislationDocument;

    useEffect(()=>{
        if(!addressDocuments){
            GetAddresses().then((res)=>{
                if(res){
                    setAddressDocuments(res);
                }
            });
        }
    });

    if(addressDocuments){
        listAddressDocuments = addressDocuments.map((elem)=>{
            return <AddressDocument address={elem}/>
        });
    }
    if(legislationDocuments){
        listLegislationDocument = legislationDocuments.map((elem)=>{
            return <LegislationDocument document={elem}/>
        });
    }

    return <div className="page documents-page">
        <div className="address-list">
            <p className="title">Документы подтверждающие право управления:</p>
            <div className="list">
                {listAddressDocuments}
            </div>
        </div>
        <div className="address-list">
            <p className="title">Жилищное законодательство:</p>
            <div className="list">
                <a className="jurj-link p-2  rounded-[5px]" href="https://disk.yandex.ru/i/txqDaz8uRqQkzA"> Жилищный кодекс Российской Федерации от 29.12.2004 N 188-ФЗ</a>
                <a className="jurj-link p-2  rounded-[5px]" href="https://yadi.sk/i/qdkuh85mL2Orkg"> Постановление РФ от 06.05.2011 № 354 «О предоставлении коммунальных услуг собственникам и пользователям помещений в многоквартирных домах и жилых домов»</a>
                <a className="jurj-link p-2  rounded-[5px]" href="https://yadi.sk/i/CILtVHA1srcxsA"> Постановление Правительства РФ от 21.01.2006 N 25 «Об утверждении Правил пользования жилыми помещениями» </a>
                <a className="jurj-link p-2  rounded-[5px]" href="https://yadi.sk/i/CILtVHA1srcxsA"> Жилищный кодекс Российской Федерации от 29.12.2004 N 188-ФЗ</a>
                <a className="jurj-link p-2  rounded-[5px]" href="https://yadi.sk/i/99G6C4RRWMkyJQ"> Постановление Правительства РФ от 28.01.2006 N 47 «Об утверждении Положения о признании помещения жилым помещением, жилого помещения непригодным для проживания и многоквартирного дома аварийным и подлежащим сносу или реконструкции» </a>
                <a className="jurj-link p-2  rounded-[5px]" href="https://yadi.sk/i/iMYXlEVIIGspRg"> Постановление Правительства РФ от 23.05.2006 N 306 «Об утверждении Правил установления и определения нормативов потребления коммунальных услуг» </a>
                <a className="jurj-link p-2  rounded-[5px]" href="https://yadi.sk/i/WAatOrVwvh5zSg"> Постановление Правительства РФ от 13.08.2006 N 491 «Об утверждении Правил содержания общего имущества в многоквартирном доме и правил изменения размера платы за содержание и ремонт жилого помещения в случае оказания услуг и выполнения работ по управлению, содержанию и ремонту общего имущества в многоквартирном доме ненадлежащего качества и (или) с перерывами, превышающими установленную продолжительность» </a>
                <a className="jurj-link p-2  rounded-[5px]" href="https://yadi.sk/i/V_i9rQXgibxMww"> Постановление Госстроя РФ от 27.09.2003 N 170 «Об утверждении Правил и норм технической эксплуатации жилищного фонда» </a>
                <a className="jurj-link p-2  rounded-[5px]" href="https://yadi.sk/i/kzN7BQGgdO4deQ"> Технический регламент о безопасности сетей газораспределения и газопотребления, утверждённый постановлением Правительства РФ от 29.10.2010 г. №870 </a>
                <a className="jurj-link p-2  rounded-[5px]" href="https://yadi.sk/i/42bY3QYEHumWYw"> Технический регламент о требованиях пожарной безопасности №123-ФЗ от 22.07.2008г. </a>
                <a className="jurj-link p-2  rounded-[5px]" href="https://yadi.sk/i/1R4S54h3H9UZBA"> Федеральный закон о санитарно-эпидемиологическом благополучия населения 30 марта 1999 года N 52-ФЗ </a>
                <a className="jurj-link p-2  rounded-[5px]" href="https://yadi.sk/i/y4ch57WUbMOKlA"> Решение от 28 декабря 2005 г. N В-160 «Об оплате жилья и о нормативах потребления коммунальных услуг в городе Красноярске»  </a>
                <a className="jurj-link p-2  rounded-[5px]" href="https://yadi.sk/i/lbtAeYXswVDuPg"> Постановление Главного государственного санитарного врача РФ от 10.06.2010 N 64 “Об утверждении СанПиН 2.1.2.2645-10”   </a>
                <a className="jurj-link p-2  rounded-[5px]" href="https://yadi.sk/i/29wqO2Vi6PDvjw"> Федеральный закон от 23.11.2009 N 261-ФЗ (ред. от 12.12.2011) “Об энергосбережении и о повышении энергетической эффективности и о внесении изменений в отдельные законодательные акты Российской Федерации”</a>
                <a className="jurj-link p-2  rounded-[5px]" href="https://yadi.sk/i/jnKlyu6VERosaA"> Федеральный закон от 07.12.2011 N 416-ФЗ “О водоснабжении и водоотведении”</a>
                <a className="jurj-link p-2  rounded-[5px]" href="https://yadi.sk/i/xl2WtT0gMZ8fjg"> Федеральный закон от 21.07.2007 N 185-ФЗ (ред. от 30.11.2011) “О Фонде содействия реформированию жилищно-коммунального хозяйства” (с изм. и доп., вступающими в силу с 01.01.2012) </a>
                <a className="jurj-link p-2  rounded-[5px]" href="https://yadi.sk/i/1es6QxYxtRqLhQ"> Федеральный закон от 29.12.2004 N 189-ФЗ (ред. от 04.06.2011) “О введении в действие Жилищного кодекса Российской Федерации”  </a>
                <a className="jurj-link p-2  rounded-[5px]" href="https://yadi.sk/d/8XZyVWBOB_Vv8w"> Постановление Правительства РФ от 21.07.2008 N 549 (ред. от 06.05.2011) “О порядке поставки газа для обеспечения коммунально-бытовых нужд граждан” (вместе с “Правилами поставки газа для обеспечения коммунально-бытовых нужд граждан”) (с изм. и доп., вступающими в силу с 09.06.2011)  </a>
                <a className="jurj-link p-2  rounded-[5px]" href="https://yadi.sk/i/2FrG_5w0-SR_rA"> Приказ Минрегиона России от 29.12.2011 N 627 “Об утверждении критериев наличия (отсутствия) технической возможности установки индивидуального, общего (квартирного), коллективного (общедомового) приборов учета, а также формы акта обследования на предмет установления наличия (отсутствия) технической возможности установки таких приборов учета и порядка ее заполнения” (Зарегистрировано в Минюсте России 23.04.2012 N 23933)   </a>
                <a className="jurj-link p-2  rounded-[5px]" href="https://yadi.sk/i/Uc-mUn4JwZmY1w"> Постановление администрации г.Красноярска от 5 мая 2008г. № 245 Об утверждении положения и о порядке установления размера платы за содержание и ремонт жилого помещения для собственников помещений в многоквартирном доме, не принявших на их общем собрании решения об установлении размера платы за содержание и ремонт жилого помещения</a>
                <a className="jurj-link p-2  rounded-[5px]" href="https://yadi.sk/i/6Pcag0Hrea58Uw"> Постановление администрации г.Красноярска от 21 мая 2010г. № 210 о межведомственной комиссии по вопросам признания помещений жилыми помещениями, пригодными (непригодными) для проживания граждан, а также многоквартирного дома аварийным и подлежащим сносу или реконструкции </a>
                <a className="jurj-link p-2  rounded-[5px]" href="https://yadi.sk/i/9bPVfzhM4uH8kw"> Постановление администрации г.Красноярска от 14 ноября 2005г. № 572 об утверждении положения и порядке согласования переустройства и (или) перепланировки жилых помещений, расположенных на территории г.Красноярска </a>
                <a className="jurj-link p-2  rounded-[5px]" href="https://yadi.sk/i/ulc-M9ACEANDhA"> Закон Красноярского края от 20.12.2012г. №3-957 “О временных мерах поддержки населения в целях обеспечения доступности коммунальных услуг”  </a>
                <a className="jurj-link p-2  rounded-[5px]" href="https://yadi.sk/i/M9bfGrLs_bg7iQ"> Постановление Правительства РФ от 3 апреля 2013г. № 290 «О минимальном перечне услуг и работ, необходимых для обеспечения надлежащего содержания общего имущества в многоквартирном доме, и порядке их оказания и выполнения»  </a>
                <a className="jurj-link p-2  rounded-[5px]" href="https://yadi.sk/i/E_KDyqhDxaANkQ"> Закон Красноярского края от 27.06.2013 N 4-1451 “Об организации проведения капитального ремонта общего имущества в многоквартирных домах, расположенных на территории Красноярского края” (подписан Губернатором Красноярского края 11.07.2013)  </a>
                <a className="jurj-link p-2  rounded-[5px]" href="https://yadi.sk/i/mhO9wj92SdCOAg"> Решение Красноярского городского Совета депутатов от 25.11.2014г. № В-88 О внесении изменений в решение Красноярского городского Совета от 28.12.2005 № В-160 «Об утверждении размера платы за жилое помещение для нанимателей жилых помещений по договорам социального найма и договорам найма жилых помещений государственного или муниципального жилищного фонда и о нормативах потребления коммунальных услуг в городе Красноярске» </a>
                <a className="jurj-link p-2  rounded-[5px]" href="https://base.garant.ru/70700450/"> Федеральный закон от 21.07.2014 № ФЗ-209 “О государственной информационной системе жилищно-коммунального хозяйства”</a>
            </div>
        </div>
    </div>
}
export default DocumentsPage;