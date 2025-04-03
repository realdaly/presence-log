"use client";
import Layout from "@/components/template/Layout";
import Groups from "@/components/homepage/Groups";
import CreateGroupBtn from "@/components/homepage/CreateGroupBtn";
import { useTheme } from "@/components/template/ConfigContext";
import Loader from "@/components/ui/Loader";

export default function Page(){
    const { loading, groups, getGroups } = useTheme();    

    return(
        <Layout>
            {loading && <Loader />}
            
            {!loading && 
            <Groups 
                groups={groups}
                getGroups={getGroups}
            />}

            <CreateGroupBtn getGroups={getGroups} />
        </Layout>
    );
}