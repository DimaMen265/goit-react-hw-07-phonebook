import { useSelector, useDispatch } from "react-redux";
import { getContacts, getFilter } from "../../redux/selectors";
import { deleteContact } from "../../redux/contactsSlice";
import styles from "./ContactList.module.css";

export const ContactList = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(getContacts);
    const filter = useSelector(getFilter);
    
    return (
        <div className={styles.wrapper}>
            {contacts.length > 0 ? (
                <ul className={styles.listContact}>
                    {(filter.length > 0
                        ? contacts.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
                        : contacts
                    ).map(item => (
                        <li key={item.id}>
                            <div className={styles.wrapperItem}>
                                <p className={styles.textItem}>
                                    {item.name}: <a href={`tel:${item.number}`} className={styles.tel} >{item.number}</a> 
                                </p>
                                    
                                <button onClick={() => dispatch(deleteContact(item.id))} className={styles.buttonDelete}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={styles.textNoContacts}>No contacts...</p>
            )}
        </div>
    );
};