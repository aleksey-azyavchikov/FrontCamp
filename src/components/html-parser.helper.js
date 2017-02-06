export class HtmlParser {
    static serializeFormToJson (element) {
        var o = {};
        var a = element.serializeArray();
        $.each(a, function () {
            if (o[element.name]) {
                if (!o[element.name].push) {
                    o[element.name] = [o[element.name]];
                }
                o[element.name].push(element.value || '');
            } else {
                o[element.name] = element.value || '';
            }
        });
        return o;
    } 
}