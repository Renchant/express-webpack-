
// export default function (name, config) {
// }

class Select {
    constructor(name, config) {
        const _this = this;
        this.title = $(name + ' .xb_select-title');
        this.config = config
        this.name = name
        this.level_one_title = null
        this.level_two_title = null

        if( !this.config.level || this.config.level === 1) {
            this.createOne(name, this.config.list);
        }else if( this.config.level === 2 ){
            this.createTwo(name,this.config.list)
        }

        $(name).one('click',function(){
            $( name +' .xb_slect-item').click(function(e) {
                e.stopPropagation();
                _this.level_one_title = $(this).text()
                _this.title.text( _this.level_one_title)
                _this.show(name);
                if(_this.config.level === 2){
                    _this.createChild(_this.config)
                    $(_this.config.children + ' .xb_select-title').text('请选择城市')
                }
            })
        })

    }

    createOne(name, list, cb) {
        const _this = this;
        let position = '';

        const _html = list.map( item => {
            return `<li class="xb_slect-item">${item}</li>`
        }).join('')

        if( this.config.top && this.config.top === true ) {
            position = `top:-${list.length * 30}px`
        }else{
            position = `bottom:0`
        }

        $(name).append(`<ul class="xb_slect-itembox" style="">${_html}</ul>`)

        $(name).click(function () {
            _this.show(name);
            if( _this.name === name && _this.config.level === 2) {
                const lev2 = _this.config.children;
                const box = $(lev2 + ' .xb_slect-itembox');
                if( box.length > 0 ) {
                    $(lev2).unbind();
                    // $(lev2 + ' .xb_select-title').text('请选择城市')
                    box.remove();
                }
            }
        })

        cb && cb();
        

    }

    createTwo(name, list) {
        const arr = list.map( item => {
            return item.name
        })
        this.createOne(this.name, arr)
    }

    createChild (config) {
        const _this = this;
        const lev2 = config.children;
        let arr = [];
        const box = $(lev2 + ' .xb_slect-itembox');
        config.list.forEach( item => {
            if(_this.level_one_title === item.name ){
                arr = item.sub
            }
        })
        arr = arr.map( item => {
            return item.name
        })
        this.createOne( config.children, arr, () => {
            $(lev2).one('click',function(){
                $( lev2 +' .xb_slect-item').click(function(e) {
                    e.stopPropagation();
                    _this.level_two_title = $(this).text()
                    $(lev2 + ' .xb_select-title').text(_this.level_two_title)
                    _this.show(lev2);
                })
            })
        })

    }

    show (name) {
        $( name + ' .xb_slect-itembox').toggle();
    }
    delete () {
        console.log('213123')
    }
}

export default Select