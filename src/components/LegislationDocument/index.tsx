import { Document } from "../../types/Document";
import {FC} from 'react';

const LegislationDocument:FC<{document:Document}> = ({document}) => {
    return <a href={document.link} target="_blank" key={document.id}>
        <p className="description">{document.name}</p>
    </a>
}
export default LegislationDocument;