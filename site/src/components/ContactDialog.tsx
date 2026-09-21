import { Modal } from "./Modal";
import "./interactions.css";

export type ContactLanguage = "sr" | "en";

export interface ContactDetails {
  phone?: string;
  email?: string;
  instagram?: string;
  booking: string;
}

export interface ContactDialogProps {
  lang: ContactLanguage;
  open: boolean;
  onClose: () => void;
  contacts: ContactDetails;
}

const COPY = {
  sr: {
    title: "Kontakt i rezervacije",
    close: "Zatvori",
    phone: "Telefon",
    email: "E-mail",
    instagram: "Instagram",
    booking: "Rezervišite preko Booking.com",
    unavailable: "Direktan kontakt trenutno nije dostupan.",
  },
  en: {
    title: "Contact and booking",
    close: "Close",
    phone: "Phone",
    email: "Email",
    instagram: "Instagram",
    booking: "Book on Booking.com",
    unavailable: "Direct contact details are currently unavailable.",
  },
} as const;

function instagramUrl(value: string) {
  if (/^https?:\/\//i.test(value)) return value;
  return `https://www.instagram.com/${value.replace(/^@/, "")}`;
}

export function ContactDialog({
  lang,
  open,
  onClose,
  contacts,
}: ContactDialogProps) {
  const copy = COPY[lang];
  const hasDirectContact = Boolean(
    contacts.phone || contacts.email || contacts.instagram,
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      label={copy.title}
      className="contact-dialog"
    >
      <div className="contact-dialog__header">
        <h2>{copy.title}</h2>
        <button type="button" onClick={onClose} aria-label={copy.close} autoFocus>
          ×
        </button>
      </div>

      {!hasDirectContact && (
        <p className="contact-dialog__unavailable">{copy.unavailable}</p>
      )}

      <div className="contact-dialog__links">
        {contacts.phone && (
          <a href={`tel:${contacts.phone.replace(/[^+\d]/g, "")}`}>
            <span>{copy.phone}</span>
            <strong>{contacts.phone}</strong>
          </a>
        )}
        {contacts.email && (
          <a href={`mailto:${contacts.email}`}>
            <span>{copy.email}</span>
            <strong>{contacts.email}</strong>
          </a>
        )}
        {contacts.instagram && (
          <a
            href={instagramUrl(contacts.instagram)}
            target="_blank"
            rel="noreferrer"
          >
            <span>{copy.instagram}</span>
            <strong>{contacts.instagram}</strong>
          </a>
        )}
        <a href={contacts.booking} target="_blank" rel="noreferrer">
          <span>Booking.com</span>
          <strong>{copy.booking}</strong>
        </a>
      </div>
    </Modal>
  );
}

export default ContactDialog;
