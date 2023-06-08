<template>
    <div class="container ticket-title">
        <div class="title-item" v-for="item in ticketTitle">
            <button class="btn" :class="item.active ? 'active' : ''" @click="ChangeTitle(item.param)">
                {{ item.title }}
                <span class="count" v-if="item.count != 0"></span>
            </button>
        </div>

    </div>
    <div class="container ticket-body">
        <div class="table">
            <div class="th">
                <div class="td">
                    <select class="form-select" @change="ChangeType()" v-model="typeB">
                        <option :value="item.status" v-for="item in status">{{ item.title }}</option>
                    </select>
                </div>
                <div class="td">
                    活動名稱
                </div>
                <div class="td">
                    建立日期
                </div>
                <div class="td">
                    票種/數量
                </div>
                <div class="td">
                    選單
                </div>
            </div>
            <div class="tr" v-for="item in TicketTableSelect">
                <div class="td">
                    <span class="btn rounded-pill" :class="status.find(x => x.status == item.orderStatus)?.class">{{
                        status.find(x => x.status ==
                            item.orderStatus)?.title }}</span>
                </div>
                <div class="td">
                    <div class="mobile">活動名稱</div>
                    {{ item.activityTitle }}
                </div>
                <div class="td">
                    <div class="mobile">建立日期</div>
                    {{ dateFormatUTC(item.orderCreateDate, 'YYYY/MM/DD (dd) hh:mm') }}
                </div>
                <div class="td">
                    <div class="mobile">票種/數量</div>
                    {{ item.categoryName[0] }}/{{ item.ticketCount }}
                </div>
                <div class="td">
                    <RouterLink :to="`/member/ticket/${item.orderId}`" class="btn ticket-info-btn">訂單資訊</RouterLink>

                </div>

            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { dateFormatUTC } from '@/utils/dateFormat'
import { parseInt } from 'lodash';
import { getTicketRecord } from '@/apis/users/ticket';
const ticketTitle = reactive([
    {
        title: "全部",
        param: "all",
        count: 0,
        active: true,
        status: [0, 1, 2, 3, 4, 5, 6]
    },
    {
        title: "待付款",
        param: "wait",
        count: 0,
        active: false,
        status: [2]
    },
    {
        title: "可使用",
        param: "use",
        count: 0,
        active: false,
        status: [1]
    },
    {
        title: "其他",
        param: "other",
        count: 0,
        active: false,
        status: [0, 3, 4, 5, 6]
    },


])
interface TicketTable {
    activityTitle: string,
    orderCreateDate: string,
    scheduleName: string[],
    categoryName: string[],
    ticketCount: string,
    orderId: string,
    orderStatus: number
}
const Route = useRoute()
const Router = useRouter()
const param = ref(Route.name)
const status = ref([
    {
        title: "狀態",
        status: -1,
        class: ""
    },
    {
        title: "可使用",
        status: 1,
        class: "status-success"
    },
    {
        title: "待付款",
        status: 2,
        class: "status-wait"

    },
    {
        title: "已使用",
        status: 3,
        class: "status-stop"
    },
    {
        title: "已過期",
        status: 4,
        class: "status-stop"
    },
    {
        title: "已退票",
        status: 5,
        class: "status-stop"
    },
    {
        title: "審核中",
        status: 6,
        class: "status-wait"
    },
    {
        title: "付款失敗",
        status: 0,
        class: "status-stop"
    }
])
//title
const Table = reactive([])

const TicketTable = reactive<TicketTable[]>([])
const TicketTableSelect = reactive<TicketTable[]>([])
const typeB = ref(Route.query["typeB"] as string ?? "-1")
if (Route.query["type"]) {
    ChangeTitle(Route.query["type"] as string)
}
function ChangeTitle(param: string) {
    ticketTitle.forEach(item => {
        if (item.param == param) {
            item.active = true
        } else {
            item.active = false
        }
    })
    typeB.value = "-1"
    Router.replace({ query: { "type": param } })
    SelectTicketTable(param)
}
function ChangeType() {
    SelectTicketTable()
    Router.replace({ query: { ...Route.query, "typeB": typeB.value } })
}

//body

GetTicketRecord()
function GetTicketRecord() {
    getTicketRecord().then(response => {
        TicketTable.push(...response.data.data)
        SelectTicketTable()
    })


}
function SelectTicketTable(type: string | null = null) {
    if (!type) {
        type = Route.query["type"] as string
    }
    const status = ticketTitle.find(x => x.param == type)?.status
    let list = TicketTable
    if (status) {
        list = list.filter(x => status.includes(x.orderStatus))
    }
    if (typeB.value && typeB.value != "-1") {
        list = list.filter(x => x.orderStatus.toString() == typeB.value)
    }
    TicketTableSelect.length = 0
    TicketTableSelect.push(...list)
}

</script>


<style scoped lang="scss">
.ticket-title {
    padding: 20px 40px;
    background: #FFFFFF;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
    border-radius: 48px;
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;

    .title-item {
        display: flex;

        &:last-child {
            margin-right: 0;
        }

        button {
            display: block;
            margin: auto;
            width: 150px;
            text-align: center;
            text-decoration: none;
            padding-top: 4px;
            padding-bottom: 4px;
            color: var(--secondary-color);
            border-radius: 0;
            border: 0;
            border-bottom: transparent 2px solid;

            &:hover {
                border-bottom: var(--primary-color) 2px solid;
                color: var(--primary-color)
            }

            &.active {
                border-bottom: var(--primary-color) 2px solid;
                color: var(--primary-color)
            }
        }
    }
}

.count {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: purple;
}

.ticket-body {
    padding: 40px;
    background: #FFFFFF;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
    border-radius: 48px;
    margin-bottom: 20px;

    .table {

        .th,
        .tr {
            display: flex;

            @media (max-width: 992px) {
                display: block;
            }

            .td {
                margin-right: 24px;

                display: flex;
                justify-content: center;
                align-items: center;

                &:nth-child(1) {
                    width: 110px;
                    border: none;
                }

                &:nth-child(2) {
                    width: 90px;
                    flex-grow: 1;
                }

                &:nth-child(3) {
                    width: 164px;
                }

                &:nth-child(4) {
                    width: 110px;
                }

                &:nth-child(5) {
                    width: 200px;
                    margin-right: 0;
                }
            }
        }

        .th {
            margin-bottom: 24px;

            .td {
                color: var(--primary-color);
                border-color: var(--primary-color);
                border-right: 1px solid black;
                border-left: 1px solid black;

                @media (max-width: 992px) {
                    display: none;

                    &:first-child {
                        display: block;
                        width: 100%;

                        select {
                            text-align: center;
                        }
                    }
                }
            }
        }

        .tr {
            padding: 8px 0;
            border-bottom: 1px solid var(--gray);

            @media (max-width: 992px) {
                padding-bottom: 8px;
                margin-bottom: 32px;
            }

            .td {
                .mobile {
                    display: none;
                }

                @media (max-width: 992px) {
                    &:nth-child(1n) {
                        width: 100%;
                        justify-content: start;
                        margin-bottom: 16px;
                    }

                    .mobile {
                        display: inline;
                    }
                }
            }
        }
    }
}

.ticket-info-btn {
    background-color: black;
    color: #FFFFFF;
    width: 100%;

    &:hover {
        background-color: var(--warning-color);
        color: black;
    }
}

.status-success {
    border-color: var(--dark-green-color);
    color: var(--dark-green-color);
    width: 100%;
    cursor: default;
}

.status-wait {
    border-color: var(--orange-color);
    color: var(--orange-color);
    width: 100%;
    cursor: default;
}

.status-stop {
    border-color: var(--secondary-color);
    color: var(--secondary-color);
    width: 100%;
    cursor: default;
}</style>