<style scoped>
.expand-row {
  margin-bottom: 5px;
}
</style>
<template>
    <div>
        <Row class="expand-row">
            <Col span="24">
                <span class="expand-key">{{ row.comments }} </span>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
  props: {
    row: Object
  }
};
</script>