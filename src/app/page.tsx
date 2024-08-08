"use client";

import { Header } from "@/components/Header";
import { SearchTabs } from "@/components/SearchTabs";

const Home = () => {
    return (
        <>
            <Header hideBack hideSearch />
            <SearchTabs />
        </>
    );
};

export default Home;
