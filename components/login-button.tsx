"use client";
import { useRouter } from "next/navigation";

interface LoginButtonProps {
    children: React.ReactNode
};

export const LoginButton = ({ children }: LoginButtonProps) => {
    const router = useRouter();

    const onClick = () => {
        router.push("/auth/login");
    }
    return (
        <span onClick= {onClick} className="cursor-pointer">
            { children }
        </span>
    );
};
