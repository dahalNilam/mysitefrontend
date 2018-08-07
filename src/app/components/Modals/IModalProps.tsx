export interface IModalProps {
    isOpen: boolean,
    title: string,
    submit: () => void,
    close: () => void,
}