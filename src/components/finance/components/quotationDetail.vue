<template>
    <div>
        <task-form-detail></task-form-detail>
    </div>
</template>
<script>
import taskFormDetail from "@/components/TaskFormDetail"
export default {
    components : {
        taskFormDetail
    },
    created () {
        this.$store.dispatch("changeTaskDetail", {id : this.$route.params.taskId});
    }
}
</script>

