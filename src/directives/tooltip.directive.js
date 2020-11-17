import localizeFilter from '@/filters/localize.filter'

export default {
    bind(el, {value, modifiers}) {
        M.Tooltip.init(el, {html: modifiers.noloc ? value : localizeFilter(value)})
    },
    unbind(el) {
        const tooptip = M.Tooltip.getInstance(el);

        if(tooptip && tooptip.destroy) {
            tooptip.destroy()
        }
    }
}