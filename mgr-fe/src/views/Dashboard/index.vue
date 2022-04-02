<template>
    <div>
        <a-spin :spinning="loading">
            <a-card>
            <div class="list">
                <div class="item">
                    <div class="count">共 {{baseInfo.total.doctor}}  名</div>
                    <div class="title">医生</div>
                </div>
                <div class="item">
                    <div class="count">共 {{baseInfo.total.article}}  篇</div>
                    <div class="title">文章</div>
                </div>
                <div class="item">
                    <div class="count">共 {{baseInfo.total.user}} 名</div>
                    <div class="title">用户</div>
                </div>
            </div>
        </a-card>
        </a-spin>
        <div class="table-list">
            <div class="left">
                <Doctor simple></Doctor>
            </div>
            <div class="right">
                <Article
                simple
                ></Article>
            </div>
        </div>
    </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
    @import './index.scss';
</style>