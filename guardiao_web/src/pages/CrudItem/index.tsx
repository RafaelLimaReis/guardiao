import { useNavigate, useParams } from "react-router-dom"
import { ContainerMain } from "../../styles/global"
import { ContainerForm, Input, LinkButton, PreloadImage, Select } from "./styles"
import { PlusCircle } from "phosphor-react"
import React, { ChangeEvent, useRef, useState } from "react"
import { ItemProps } from "../../interfaces/Item"
import { format } from "date-fns"
import { IPCONFIG } from "../../libs/configIp"

interface crudItemProps {
    items?: ItemProps[];
    managerItem: (formData: FormData|object, itemUpdate?: ItemProps) => Promise<boolean>;
}

export function CrudItem({ items, managerItem }: crudItemProps) {
    const [srcImgPreview, setSrcImgPreview] = useState<string>('')
    const [inputImage, setInputImage] = useState<File | null>()
    const [itemInput, setItemInput] = useState<string>('')
    const [date, setDate] = useState<string>('')
    const [local, setLocal] = useState<string>('')
    const [periodo, setPeriodo] = useState<string>('')
    const [aluno, setAluno] = useState<string>('')
    const [ra, setRa] = useState<string>('')
    const navigate = useNavigate();
    let itemUpdate: ItemProps | undefined;
    let responseUpdateState = false;

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
    if (item) {
        itemUpdate = items?.find((value) => value._id === item);
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        let formData = null;
        if (!itemUpdate) {
            formData = new FormData();
            if (inputImage) {
                formData.append('image', inputImage)
            }
            formData.append('item',  itemInput);
            formData.append('data',  date);
            formData.append('local',  local);
            formData.append('periodo',  periodo);
        } else {
            formData = {
                '_id':  itemUpdate._id,
                'aluno':  aluno,
                'raAluno':  ra
            };
        }

        if (itemUpdate) {
            responseUpdateState =  await managerItem(formData, itemUpdate);
        } else {
            responseUpdateState = await managerItem(formData);
        }

        if (responseUpdateState) {
            navigate('/');
        }
    }   
    return (
        <ContainerMain>
            {item ? (itemUpdate && itemUpdate.retirada == null ? <h1>Registrar retirada</h1> : <h1>Item retirado</h1>) : <h1>Cadastrar Item</h1>}

            <ContainerForm onSubmit={handleSubmit}>
                <input type="file" id="imageInput" accept="image/*" style={{ display: "none" }} ref={refInputImage} onChange={handleImageLoad} capture="environment" />
                {itemUpdate ? (
                    <>
                        <PreloadImage id="preload-image" onClick={handlePreviewLoadImage}>
                            {<img src={`${IPCONFIG}${itemUpdate.image}`} alt="Preview da imagem selecionada" />}
                        </PreloadImage>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <span><b>Item:</b> {itemUpdate.name}</span>
                            <span><b>Data:</b> {format(new Date(itemUpdate.data), "dd/MM/yyyy")}</span>
                            <span><b>Local:</b> {itemUpdate.local}</span>
                            <span><b>Periodo:</b> {itemUpdate.periodo}</span>
                        </div>
                    </>
                ) : (
                    <>
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
                    </>
                )}
                {itemUpdate && itemUpdate.retirada == null ? <>
                    <Input type="text" name="nome" placeholder="nome do aluno" id="nome" value={aluno} onChange={(e) => setAluno(e.target.value)} />
                    <Input type="text" name="RA" placeholder="RA do aluno" id="RA" value={ra} onChange={(e) => setRa(e.target.value)} />
                </> : ( itemUpdate && 
                    <>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <h4 style={{margin: '15px auto'}}>Informações de retirada</h4>
                            {itemUpdate.retirada.dataRetirada && (
                                <span><b>Data:</b> {format(new Date(itemUpdate.retirada.dataRetirada), "dd/MM/yyyy")}</span>
                            )}
                            <span><b>Aluno:</b> {itemUpdate.retirada.nomeAluno}</span>
                            <span><b>Ra:</b> {itemUpdate.retirada.raAluno}</span>
                            <span><b>Segurança:</b> {itemUpdate.retirada.seguranca?.nome}</span>
                        </div>
                    </>                    
                )}

                <div>
                    <LinkButton to={'/'}>Voltar</LinkButton>
                    <button type="submit">Salvar</button>
                </div>
            </ContainerForm>
        </ContainerMain>
    )
}