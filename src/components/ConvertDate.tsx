export function ConvertDate(dateStr:any) {
    const date = new Date(dateStr); // Преобразуем строковое представление даты в объект Date
    
    date.setHours(date.getHours());
    // console.log(date);
    return date.toLocaleDateString('ru', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
    // }) + ' ' + date.toLocaleTimeString('ru', {
    //     hour: 'numeric',
    //     minute: '2-digit',
    //     second: '2-digit'
    // });
}
export function ConvertDateTime(dateStr:any) {
    const date = new Date(dateStr); // Преобразуем строковое представление даты в объект Date
    
    date.setHours(date.getHours());
    // console.log(date);
    return date.toLocaleDateString('ru', {
        day: 'numeric',
        month: 'short',
        // year: 'numeric'
    }) + ' ' + date.toLocaleTimeString('ru', {
        hour: 'numeric',
        minute: '2-digit',
        // second: '2-digit'
    });
}
export function ConvertDateToDatePicker(dateStr:any)
{
    // const formattedDate = new Date(dateStr).toISOString().slice(0, 10);
    const formattedDate = new Date(dateStr);
    //return formattedDate;
    return `${formattedDate.getFullYear()}-${String(formattedDate.getMonth() + 1).padStart(2, '0')}-${String(formattedDate.getDate()).padStart(2, '0')}`;
}