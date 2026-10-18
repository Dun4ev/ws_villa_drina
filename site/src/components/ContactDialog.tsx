import { Modal } from "./Modal";
import "./interactions.css";

export type ContactLanguage = "sr" | "en";

export interface ContactDialogProps {
  lang: ContactLanguage;
  open: boolean;
  onClose: () => void;
}

const COPY = {
  sr: {
    title: "O ovom demou",
    close: "Zatvori",
    unavailable: "Samostalni portfolio koncept, nije klijentski projekat. Objekti i nazivi su izmišljeni; ilustrativne slike su generisane pomoću AI. Kontakt i rezervacije nisu dostupni.",
  },
  en: {
    title: "About this demo",
    close: "Close",
    unavailable: "A self-initiated portfolio concept, not a client commission. Properties and names are fictional; illustrative images are AI-generated. Contact and reservations are unavailable.",
  },
} as const;

export function ContactDialog({
  lang,
  open,
  onClose,
}: ContactDialogProps) {
  const copy = COPY[lang];

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

      <p className="contact-dialog__unavailable">{copy.unavailable}</p>


    </Modal>
  );
}

export default ContactDialog;
