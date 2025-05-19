"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import readConfig from "@/utils/readConfig";
import readGroups from "@/utils/homepage/readGroups";
import initDatabase from "@/db/initDatabase";

const ConfigContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isAlert, setIsAlert] = useState(false);

    // config states
    const [title, setTitle] = useState("");
    const [school, setSchool] = useState(null);
    const [year, setYear] = useState(null);
    const [principal, setPrincipal] = useState(null);
    const [accentColor, setAccentColor] = useState("accent1");

    const [groups, setGroups] = useState([]);
    const [terms, setTerms] = useState([]);

    async function createDatabaseTables(){
        await initDatabase();
    }

    async function getConfig(){
        await readConfig(
            setTitle, 
            setSchool,
            setYear, 
            setPrincipal, 
            accentColor, 
            setAccentColor,
        );
    }

    async function getGroups(){
        const fetchedGroups = await readGroups();
        setGroups(fetchedGroups);
    };

    async function getTerms(){
        const fetchedTerms = await readTerms();
        setTerms(fetchedTerms);
    };

    async function initialFunction(){
        await createDatabaseTables();
        // await getConfig();
        await getGroups();
        // await getTerms();
        setLoading(false);
    }

    useEffect(() => {
        initialFunction();
    }, []);

    return (
    <ConfigContext.Provider 
        value={{ 
            title,
            setTitle,
            accentColor, 
            setAccentColor,
            loading,
            setLoading,
            groups,
            getGroups,
            isAlert,
            setIsAlert
        }}
    >
        {children}
    </ConfigContext.Provider>
    )
}

export const useTheme = () => {
    return useContext(ConfigContext);
}