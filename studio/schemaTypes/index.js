import {defineField, defineType} from 'sanity'

const siteContent = defineType({
  name: 'siteContent',
  title: 'Conteúdo do Site',
  type: 'document',
  fields: [
    defineField({name: 'titulo_principal', title: 'Nome do Restaurante', type: 'string'}),
    defineField({name: 'subtitulo', title: 'Frase do Hero', type: 'text'}),
    defineField({name: 'hero_card_texto', title: 'Texto do Card Hero', type: 'text'}),
    defineField({name: 'hero_botao_whatsapp', title: 'Botão WhatsApp', type: 'string'}),
    defineField({name: 'hero_botao_conhecer', title: 'Botão Conhecer', type: 'string'}),

    defineField({name: 'popup_titulo', title: 'Título do Popup', type: 'string'}),
    defineField({name: 'popup_subtitulo', title: 'Texto do Popup', type: 'text'}),
    defineField({name: 'popup_botao', title: 'Botão do Popup', type: 'string'}),
    defineField({name: 'popup_link', title: 'Link do Popup', type: 'url'}),

    defineField({name: 'experiencia_titulo', title: 'Título Experiência', type: 'string'}),
    defineField({name: 'experiencia_lead', title: 'Texto Experiência', type: 'text'}),
    defineField({name: 'experiencia_item1', title: 'Experiência — Item 1', type: 'text'}),
    defineField({name: 'experiencia_item2', title: 'Experiência — Item 2', type: 'text'}),
    defineField({name: 'experiencia_item3', title: 'Experiência — Item 3', type: 'text'}),

    defineField({name: 'galeria_lead', title: 'Texto da Galeria', type: 'text'}),

    defineField({name: 'gastronomia_titulo', title: 'Título Gastronomia', type: 'string'}),
    defineField({name: 'gastronomia_lead', title: 'Texto Gastronomia', type: 'text'}),

    defineField({name: 'prato1_nome', title: 'Prato 1 — Nome', type: 'string'}),
    defineField({name: 'prato1_descricao', title: 'Prato 1 — Descrição', type: 'text'}),
    defineField({name: 'prato2_nome', title: 'Prato 2 — Nome', type: 'string'}),
    defineField({name: 'prato2_descricao', title: 'Prato 2 — Descrição', type: 'text'}),
    defineField({name: 'prato3_nome', title: 'Prato 3 — Nome', type: 'string'}),
    defineField({name: 'prato3_descricao', title: 'Prato 3 — Descrição', type: 'text'}),

    defineField({name: 'chef_nome', title: 'Nome do Chef', type: 'string'}),
    defineField({name: 'chef_quote', title: 'Frase do Chef', type: 'text'}),
    defineField({name: 'chef_texto', title: 'Texto sobre o Chef', type: 'text'}),

    defineField({name: 'avaliacao1_texto', title: 'Avaliação 1 — Texto', type: 'text'}),
    defineField({name: 'avaliacao1_autor', title: 'Avaliação 1 — Autor', type: 'string'}),
    defineField({name: 'avaliacao2_texto', title: 'Avaliação 2 — Texto', type: 'text'}),
    defineField({name: 'avaliacao2_autor', title: 'Avaliação 2 — Autor', type: 'string'}),
    defineField({name: 'avaliacao3_texto', title: 'Avaliação 3 — Texto', type: 'text'}),
    defineField({name: 'avaliacao3_autor', title: 'Avaliação 3 — Autor', type: 'string'}),

    defineField({name: 'localizacao_lead', title: 'Texto Localização', type: 'text'}),
    defineField({name: 'endereco', title: 'Endereço', type: 'string'}),
    defineField({name: 'endereco_link', title: 'Link Google Maps', type: 'url'}),
    defineField({name: 'whatsapp_numero', title: 'WhatsApp exibido', type: 'string'}),
    defineField({name: 'link_whatsapp', title: 'Link WhatsApp', type: 'url'}),
    defineField({name: 'instagram_link', title: 'Instagram', type: 'url'}),
    defineField({name: 'facebook_link', title: 'Facebook', type: 'url'}),

    defineField({name: 'cta_titulo', title: 'Título CTA Final', type: 'string'}),
    defineField({name: 'cta_lead', title: 'Texto CTA Final', type: 'text'}),
    defineField({name: 'cta_botao', title: 'Botão CTA Final', type: 'string'}),
  ],
})

export const schemaTypes = [siteContent]