"use client";
import * as React from "react";

import { UserType } from "@/lib/types";

// ------------------------------------------------------------------------------------------------

type UserContextType = {
	user: UserType | null;
	isLoading: boolean;
	addPoints: (points: number) => void;
};

const UserContext = React.createContext<UserContextType | null>(null);

// ------------------------------------------------------------------------------------------------

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = React.useState<UserType | null>(null);
	const [isLoading, setLoading] = React.useState<boolean>(false);

	React.useEffect(() => {
		setLoading(true);

		const storedUser = sessionStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		} else {
			const newUser = {
				name: "John Doe",
				streak: 45,
				streakFreeze: 2,
				points: 5000,
			};
			sessionStorage.setItem("user", JSON.stringify(newUser));
			setUser(newUser);
		}
		setLoading(false);
	}, []);

	const addPoints = (points: number) => {
		// api call
		setLoading(true);

		const storedUser = sessionStorage.getItem("user");
		if (storedUser) {
			const userData = JSON.parse(storedUser);
			userData.points += points;
			sessionStorage.setItem("user", JSON.stringify(userData));
			setUser(userData);
		}
		setLoading(false);
	};

	return (
		<UserContext.Provider value={{ user, isLoading, addPoints }}>{children}</UserContext.Provider>
	);
};

// ------------------------------------------------------------------------------------------------

export const useUserData = (): UserContextType => {
	const context = React.useContext(UserContext);
	if (!context) {
		throw new Error("useUserData must be used within an UserProvider");
	}
	return context;
};
