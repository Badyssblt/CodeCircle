<template>
  <div>
    <div v-if="editor" class="">
        <button @click.prevent="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">
          Insérer du code
        </button>
      
    </div>
    <TiptapEditorContent :editor="editor" class="border rounded-md px-4 py-2 focus:outline-none min-h-96"/>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from 'vue';
import { useEditor } from '@tiptap/vue-3';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { all, createLowlight } from 'lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
const lowlight = createLowlight(all)

lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)


const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    TiptapStarterKit.configure({
        codeBlock: false
    }),
    CodeBlockLowlight.configure({ lowlight }),
  ],
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML());
  },
});


</script>

<style >
    pre {
        background: #181C23 !important;
    }

    

    .ProseMirror:focus {
    outline: none;
}
</style>