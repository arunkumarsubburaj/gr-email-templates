<template>
  <tr>
    <td v-html="templateOutput"></td>
  </tr>
</template>
<script>
export default {
  name: "PreviewRenderer",
  props: ["tData", "tHtml"],
  computed: {
    templateOutput: function () {
      return this.tData ? this.renderTemplate(this.tData, this.tHtml) : null;
    },
  },
  methods: {
    renderTemplate: (data, html) =>
      html.length > 5
        ? html.replace(/\[\[(.*?)\]]/g, (full, property) =>
            data[property] ? data[property].value : property
          )
        : "<div>Invalid Template</div>",
  },
};
</script>