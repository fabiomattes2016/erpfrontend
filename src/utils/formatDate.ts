/*
 * Formato padrão de datas no Brasil e na API => 31/12/1999 23:59 
 * Formato ISO 1999-12-31 23:59
*/

export const useDate = () => {
    const formatDateForApi = (value: string) => {
        const [year, month, day, time] = value.replace('T', '-').split('-'); // ['1999', '12'. '31', '23:59']
        const data = `${day}/${month}/${year} ${time}`;
        return data;
    }

    const formatApiDate = (value: string) => {
        const [year, month, day, time] = value.slice(0, -4).replace('T', '-').split('-'); // ['1999', '12'. '31', '23:59']
        const data = `${day}/${month}/${year} ${time}`;
        return data;
    }

    return {formatDateForApi, formatApiDate};
}