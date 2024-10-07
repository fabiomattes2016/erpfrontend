import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useRequests } from "src/utils/requests";

type Props = {
    selectedStatus: number;
    setSelectedStatus: (statusId: number) => void;
}

function SelectTaskStatus({selectedStatus, setSelectedStatus}: Props) {
    return (
        <FormControl fullWidth>
            <InputLabel>Selecione um Funcionário *</InputLabel>
            <Select
                value={selectedStatus}
                label="Selecione o status da Tarefa"
                onChange={(e) => setSelectedStatus(+e.target.value)}
            >
               <MenuItem value={1}>Não Iniciado</MenuItem>
               <MenuItem value={2}>Em Andamento</MenuItem>
               <MenuItem value={3}>Concluída</MenuItem>
            </Select>
        </FormControl>
    )
}

export default SelectTaskStatus;