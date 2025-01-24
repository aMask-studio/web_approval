import { Address } from "../../types/Address";
import { Document } from "../../types/Document";
import {FC} from 'react';
import { IoMdDownload } from "react-icons/io";
import './style.scss';

const AddressDocument:FC<{address:Address}> = ({address}) => {
    return <a key={address.address_id} href={address.address_document_link} className="address-document-block" target="_blank">
        <span>{address.address_name}</span>
        <IoMdDownload/>
    </a>
}
export default AddressDocument;