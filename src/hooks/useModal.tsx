import {useState, useCallback} from "react";
import {TUseModal} from "../types/props";

export const useModal = (): TUseModal => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    return {
        isModalOpen,
        openModal,
        closeModal
    };
};