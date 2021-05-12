<template>
    <div class="pib">
        <div v-for='(item, index) in PIBConf' :key='index' class="content">
            <h3>{{item.name}}</h3>
            <div v-for="(_item, _index) in item.children" :key='_index'>
                <div>
                    <div class="item">
                        <div v-if="_item.param !== 'V'">{{_index + 1}}.</div>
                        <div>
                            <div>{{_item.title_zh}}{{_item.title_en}}</div>
                            <div v-if="_item.param" class="answer">A: {{info[_item.param]}}</div>
                            <div v-else>
                                <div v-for="(_item_, _index_) in _item.type" :key='_index_' class="item">
                                    <div>({{String.fromCharCode(_index_ + 97)}})</div>
                                    <div>
                                        <div>{{_item_.title_zh}}{{_item_.title_en}}</div>
                                        <div class="answer">A: {{info[_item_.param]}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
    </div>
</template>
<script>
import { PIBConf } from "../../../assets/conf/PIB.conf.js"

export default {
    props: {
        info: {
            type: [Array, Object]
        }
    },
    data() {
        return {
            PIBConf
        }
    }
}
</script>
<style lang="less" scoped>
.pib {
    .content {
        padding: 20px 0;
        border-bottom: 1px dashed #CED4DA;
        font-size: 14px;
        &:last-child {
            border: none
        }
        .item {
            display: flex;
            margin-top: 10px;
            &>div {
                &:nth-child(2) {
                    margin-left:5px;
                }
            }
            .answer {
                color: #2D8EF8;
                font-size: 13px;
                margin-top: 5px;
            }
        }
    }
}
</style>


