import { Box, Button, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import GroupsTable from "src/components/GroupsTable";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { PermissionMiddleware } from "src/middlewares/permissionMiddleware";
import { GroupDetail } from "src/models/group";
import { useRequests } from "src/utils/requests";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";

function Groups() {
    const [requestLoading, setRequestLoading] = useState(true);
    const [groupsData, setGroupsData] = useState<GroupDetail[]>([]);

    const {getGroups} = useRequests();

    async function handleGetGroups() {
        const response = await getGroups();
        setGroupsData(response.data.groups);
        setRequestLoading(false);
    }

    useEffect(() => {
        handleGetGroups();
    }, []);

    return (
       <PermissionMiddleware codeName="view_group">
            <>
                <Helmet>
                    <title>Cargos</title>
                </Helmet>

                <PageTitleWrapper>
                    <PageTitle heading="Cargos" subHeading="Consulte os cargos da Empresa..." />
                </PageTitleWrapper>
            </>
            
            <Container 
                maxWidth="xl"
                sx={{
                    marginX: requestLoading ? '-10%' : 0,
                    transition: 'all .5s'
                }}
            >
                <GroupsTable 
                    refreshList={handleGetGroups}
                    groupsList={groupsData}
                />
            </Container>
       </PermissionMiddleware>
    );
}

export default Groups;