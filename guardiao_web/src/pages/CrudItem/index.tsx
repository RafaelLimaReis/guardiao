import { useParams } from "react-router-dom"
import { ContainerMain } from "../../styles/global"
import { ContainerForm, Input, LinkButton, PreloadImage } from "./styles"
import { PlusCircle } from "phosphor-react"
import { ChangeEvent, useRef, useState } from "react"

export function CrudItem() {
    const [srcImgPreview, setSrcImgPreview] = useState<string | null>(null)
    const { item } = useParams()
    const refInputImage = useRef<HTMLInputElement>(null)

    function handlePreviewLoadImage() {
        if (refInputImage.current) {
            refInputImage.current.click();
        }
    }

    function handleImageLoad(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            const renderFile = new FileReader();
            renderFile.onloadend = () => {
                setSrcImgPreview(renderFile.result as string)
            }
            renderFile.readAsDataURL(file)
        }
    }

    return (
        <ContainerMain>
            {item ? <h1>Registrar retirada</h1> : <h1>Cadastrar Item</h1>}

            <ContainerForm>
                <input type="file" id="imageInput" accept="image/*" style={{ display: "none" }} ref={refInputImage} onChange={handleImageLoad} />
                <PreloadImage id="preload-image" onClick={handlePreviewLoadImage}>
                    {srcImgPreview ? <img src={srcImgPreview} alt="Preview da imagem selecionada" /> : <PlusCircle size="large" />}
                </PreloadImage>

                <Input type="date" name="date" placeholder="Data" id="date" />
                <Input type="text" name="locale" placeholder="Local" id="locale" />
                <Input type="text" name="periodo" placeholder="periodo" id="periodo" />

                <div>
                    <LinkButton to={'/'}>Voltar</LinkButton>
                    <button type="button">Salvar</button>
                </div>
            </ContainerForm>
        </ContainerMain>
    )
}