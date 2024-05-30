import { useParams } from "react-router-dom"
import { ContainerMain } from "../../styles/global"
import { ContainerForm, Input, LinkButton, PreloadImage, Select } from "./styles"
import { PlusCircle } from "phosphor-react"
import React, { ChangeEvent, useRef, useState } from "react"
import api from "../../libs/axios"

export function CrudItem() {
    const [srcImgPreview, setSrcImgPreview] = useState<string>('')
    const [inputImage, setInputImage] = useState<File | null>()
    const [itemInput, setItemInput] = useState<string>('')
    const [date, setDate] = useState<string>('')
    const [local, setLocal] = useState<string>('')
    const [periodo, setPeriodo] = useState<string>('')
    const [aluno, setAluno] = useState<string>('')
    const [ra, setRa] = useState<string>('')

    const { item } = useParams()
    const refInputImage = useRef<HTMLInputElement>(null)

    function handlePreviewLoadImage() {
        if (refInputImage.current) {
            refInputImage.current.click();
        }
    }

    function handleImageLoad(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        setInputImage(file);
        if (file) {
            const renderFile = new FileReader();
            renderFile.onloadend = () => {
                setSrcImgPreview(renderFile.result as string)
            }
            renderFile.readAsDataURL(file)
        }
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        const formData = new FormData();
        if (inputImage) {
            formData.append('image', inputImage)
        }
        formData.append('item',  itemInput);
        formData.append('data',  date);
        formData.append('local',  local);
        formData.append('periodo',  periodo);

        if (aluno) {
            formData.append('aluno',  aluno);
        }
        if (ra) {
            formData.append('raAluno',  ra);
        }
        try {
            const responseCadastro = await api.post('/item/cadastro', formData, { headers: { 'Content-Type': 'multipart/fomr-data'}});
            console.log(responseCadastro);
        } catch (error) {
            console.error(error);
        }

    }   

    return (
        <ContainerMain>
            {item ? <h1>Registrar retirada</h1> : <h1>Cadastrar Item</h1>}

            <ContainerForm onSubmit={handleSubmit}>
                <input type="file" id="imageInput" accept="image/*" style={{ display: "none" }} ref={refInputImage} onChange={handleImageLoad} capture="environment" />
                <PreloadImage id="preload-image" onClick={handlePreviewLoadImage}>
                    {srcImgPreview ? <img src={srcImgPreview} alt="Preview da imagem selecionada" /> : <PlusCircle size="large" />}
                </PreloadImage>

                <Input type="text" name="item" placeholder="descrição do item" id="item" value={itemInput} onChange={(e) => setItemInput(e.target.value)} />
                <Input type="date" name="date" placeholder="Data" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
                <Input type="text" name="local" placeholder="Local" id="local" value={local} onChange={(e) => setLocal(e.target.value)} />
                <Select name="periodo" id="periodo" value={periodo} onChange={(e) => setPeriodo(e.target.value)} >
                    <option value="">Selecione uma opção</option>
                    <option value="manha">Manhã</option>
                    <option value="tarde">Tarde</option>
                    <option value="noite">Noite</option>
                </Select>
                {item && <>
                    <Input type="text" name="nome" placeholder="nome do aluno" id="nome" value={aluno} onChange={(e) => setAluno(e.target.value)} />
                    <Input type="text" name="RA" placeholder="RA do aluno" id="RA" value={ra} onChange={(e) => setRa(e.target.value)} />
                </>}

                <div>
                    <LinkButton to={'/'}>Voltar</LinkButton>
                    <button type="submit">Salvar</button>
                </div>
            </ContainerForm>
        </ContainerMain>
    )
}