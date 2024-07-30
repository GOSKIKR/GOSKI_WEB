import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

interface loginState {
    role : string;
    setRole : (role : string) => void
}

type loginPersist = (
    config : StateCreator<loginState>,
    options : PersistOptions<loginState>
) => StateCreator<loginState>;

const useLoginStore = create<loginState>(
    (persist as loginPersist)(
        (set) => ({
            role : '',
            setRole :(role : string) => set(() => ({
                role : role
            }))
        }),
        {
            name : "login-store",
            getStorage : () => localStorage,
        }
    )
);

export default useLoginStore;