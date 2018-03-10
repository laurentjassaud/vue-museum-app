<template>
    <li class="reference-item">
        <a class="reference-item__link" 
            :class="{'no-image': noImage}" 
            :href="'/reference/' + datas.id"
            @click.prevent="openMoviePopup(datas.id, true)
        ">
            <figure class="reference-item__poster">
                <img v-if="!noImage" class="reference-item__img" src="../assets/images/placeholder.png" v-img="poster()" alt="">
                <img v-if="noImage" class="reference-item__img is-loaded" src="../assets/images/no-image.png" alt="">
            </figure>
            <div class="reference-item__content">
                <p class="reference-item__title">{{datas.titre}}</p>
            </div>
        </a>
    </li>
</template>

<script>

    export default {

        name: 'ReferenceListItem',

        props: [ 'reference' ],

        data() {
            return {
                datas: {},
                noImage: false
            }
        }, 

        created() {
            
            this.datas = this.reference._source
            console.log(this.reference._source) 
            // definis le titre
            this.datas.title ? this.datas.titre = this.datas.title.fr : this.datas.titre = 'Sans titre'

            // definis l'url
            let $img = this.datas.images[0]
            console.log(Object.keys($img.urls))
            $img ? this.datas.image.url = $img.urls.original : this.datas.image.url = 'noRefImage'          
        },

        methods: {
            poster() {

                if(this.datas.image.url !== 'noRefImage' ){
                    let $ref = this.datas.image.url
                    console.log($ref)
                    return $ref
                } else {
                    this.noImage = true;
                }

            },
            openMoviePopup(id, event){
                //eventHub.$emit('openMoviePopup', id, event);
            }
        } 
    }
</script>

<style lang="scss">

    @import "../assets/scss/variables";
    @import "../assets/scss/media-queries";

    .reference-item{
        &__link{
            text-decoration: none;
            color: rgba($c-dark, 0.5);
            font-weight: 300;
        }
        &__content{
            padding-top: 15px;
        }
        &__poster{
            transition: transform 0.5s ease, box-shadow 0.5s ease;
            transform: translateZ(0);
            background: $c-white;
        }
        &__img{
            width: 100%;
            opacity: 0;
            transform: scale(0.97) translateZ(0);
            transition: opacity 0.5s ease, transform 0.5s ease;
            &.is-loaded{
            opacity: 1;
            transform: scale(1);
            }
        }
        &__link:not(.no-image):hover &__poster{
            transform: scale(1.03);
            box-shadow: 0 0 10px rgba($c-dark, 0.1);
        }
        &__title{
            margin: 0;
            font-size: 11px;
            letter-spacing: 0.5px;
            transition: color 0.5s ease;
            @include mobile-ls-min{
            font-size: 12px;
            }
            @include tablet-min{
            font-size: 14px;
            }
        }
        &__link:hover &__title{
            color: $c-dark;
        }
    }

</style>
