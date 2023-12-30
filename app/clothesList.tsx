import { View, Text, FlatList, ListRenderItem } from "react-native";
import React, { useEffect, useState } from "react";
import ProductCard from "./productCard";
import { ProductType } from "../store/interfaces";
import { client } from "../lib/sanity.server";
import { urlForImage } from "../lib/sanity";

// const clothes = [
//   {
//     id: 1,
//     name: "Nike Sportswear Tech Fleece Windrunner",
//     price: 129.99,
//     category: "garment",
//     description:
//       "Tu te rends compte ? Tech Fleece fête déjà ses 10 ans ! Pour cette occasion, on a associé le design Windrunner intemporel que tu aimes tant à une nouvelle palette de couleurs inspirée des minéraux naturels. Notre Fleece premium lisse des deux côtés est encore plus chaud et doux qu'avant, sans sacrifier la légèreté. Complète ton look avec le pantalon de survêtement assorti ou ton legging préféré. Le futur du Fleece commence ici.",
//     sub_category: "Sweat à capuche et zip",
//     gender: "female",
//     image:
//       "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/5d42b676-50b6-4235-88e3-bbee445c46c1/sweat-a-capuche-et-zip-sportswear-tech-fleece-windrunner-pour-5StNRr.png",
//   },
//   {
//     id: 2,
//     name: "Nike Sportswear Phoenix Fleece",
//     price: 59.99,
//     category: "garment",

//     description:
//       "Style et confort pour toutes tes tenues : découvre notre ligne loungewear haut de gamme. Ce survêtement taille haute est confectionné en molleton brossé d‘épaisseur moyenne. Les jambes sont longues et amples. À la fois doux et structuré, il est tout sauf basique.",
//     gender: "female",
//     image:
//       "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1a45dae8-30bf-41fc-9742-f163646bd0a8/pantalon-de-survetement-ample-a-taille-haute-sportswear-phoenix-fleece-pour-83v5tC.png",
//     sub_category: "Pantalon de survêtement ample à taille haute",
//   },
//   {
//     id: 3,
//     name: "Nike Sportswear",
//     price: 89.99,
//     category: "garment",

//     description:
//       "Plus fonctionnel, plus rétro. Un modèle coup de cœur fait son grand retour. Ce pantalon ample fonctionnel présente des poches cargo pour ranger toutes tes affaires. Son tissu tissé résistant est entièrement doublé, mais reste léger. En plus, les attaches au niveau des jambes te permettent de personnaliser ton look.",
//     gender: "female",
//     image:
//       "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f1565870-ee38-4c37-b556-329148739533/pantalon-cargo-tisse-ample-a-taille-haute-sportswear-pour-1Vbrlj.png",
//     sub_category: "Pantalon cargo tissé ample à taille haute",
//   },
//   {
//     id: 4,
//     name: "Nike Sportswear Phoenix Fleece",
//     price: 59.99,
//     category: "garment",

//     description:
//       "Style et confort pour toutes tes tenues : découvre notre ligne loungewear haut de gamme. Ce sweat est loin d'être banal. On l'a conçu avec notre coupe la plus ample et des détails surdimensionnés (comme la poche oversize et les côtes plus hautes). À toi de voir si tu veux le porter avec le short assorti ou te créer ton propre look.",
//     gender: "female",
//     image:
//       "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6c13dfd8-03ce-43d7-9bde-72434a0cc31c/sweat-ultra-oversize-a-col-ras-du-cou-sportswear-phoenix-fleece-pour-9Dr8qR.png",
//     sub_category: "Sweat ultra-oversize à col ras-du-cou",
//   },
//   {
//     id: 5,
//     name: "Jordan Brooklyn",
//     price: 25,
//     category: "garment",

//     description:
//       "Ce sweat à capuche a toutes les qualités dont vous avez besoin : il est doux, décontracté et polyvalent. Il est confectionné dans un tissu Fleece brossé d'épaisseur moyenne et affiche une coupe ample facile à superposer.",
//     gender: "female",
//     image:
//       "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/44cb55e9-af09-467a-8ff6-61e5cab11e7e/sweat-a-capuche-en-tissu-fleece-jordan-brooklyn-pour-lrvXQk.png",
//     sub_category: "Sweat à capuche en tissu Fleece",
//   },
//   {
//     id: 6,
//     name: "Air Jordan Wordmark",
//     price: 71.47,
//     category: "garment",

//     description:
//       "Découvrez votre nouveau sweat-shirt préféré. Confectionné dans un tissu en molleton doux, ce pull classique vous offre encore plus de douceur. Le tissu épais offre un confort haut de gamme, tandis que l'effet délavé sur toute la surface crée un look vintage.",
//     gender: "female",
//     image:
//       "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/0eb2eac3-ea2b-4587-9b56-8231fef940e4/haut-air-jordan-wordmark-pour-21szjn.png",
//     sub_category: "Haut pour Femme",
//   },
//   {
//     id: 7,
//     name: "Nike Pro Dri-FIT",
//     price: 26.47,
//     category: "garment",

//     description:
//       "Jouer peut abîmer ton legging préféré. Dessiner à la craie sur le sol, observer les insectes, danser… ça peut abîmer le tissu aux genoux. On a donc renforcé cette zone pour te permettre de jouer en toute confiance. Et avec la technologie Nike Dri-FIT, tu profites d'un maximum de fraîcheur. Adieu la transpiration.",
//     gender: "female",
//     image:
//       "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/79534332-a60c-451e-8a44-588b60ec02c7/legging-pro-dri-fit-pour-ado-FVgSNN.png",
//     sub_category: "Legging pour ado (fille)",
//   },
//   {
//     id: 8,
//     name: "Nike Dri-FIT Swoosh Run",
//     price: 27.97,
//     category: "garment",

//     description:
//       "Le haut deuxième couche Nike Dri-FIT Swoosh Run vous accompagnera dans votre pratique du running. Il offre une sensation de douceur et présente une fermeture à 1/4 de zip pour adapter la circulation de l'air en fonction des besoins. Les ouvertures pour les pouces sur les manches vous permettent de protéger vos mains lorsque le temps se rafraîchit.",
//     gender: "female",
//     image:
//       "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b502f9e1-683e-4d1b-9b2f-e90ec1196393/vetement-deuxieme-couche-de-running-dri-fit-swoosh-run-pour-N0f47Z.png",
//     sub_category: "Vêtement deuxième couche de running",
//   },
//   //   {
//   //     id: 1,
//   //     name: "",
//   //     price: 25,
//   //     description: "",
//   //     gender: "",
//   //     image: "",
//   //     category: "",
//   //   },
//   //   {
//   //     id: 1,
//   //     name: "",
//   //     price: 25,
//   //     description: "",
//   //     gender: "",
//   //     image: "",
//   //     category: "",
//   //   },
// ];

const clothesList = () => {
  const [clothes, setClothes] = useState<any>([]);
  useEffect(() => {
    client
      .fetch(
        `*[_type == 'product' && references(*[_type=="category" && name == 'clothes' ]._id)  && references(*[_type=="gender" && name == 'male' ]._id)]`
      )
      .then((res) => {
        setClothes(res);
      });
  }, []);
  //   const renderItem: ListRenderItem<ProductType> = ({ item }) => (
  //     <ProductCard
  //       id={item._id}
  //       name={item.name}
  //       price={item.price}
  //       image={item.image}
  //       gender={item.gender}
  //       description={item.description}
  //       category={item.category}
  //       sub_category={item.sub_category}
  //     />
  //   );

  const itemData = clothes.map((item: any) => (
    <ProductCard
      id={item._id}
      name={item.name}
      price={item.price}
      image={urlForImage(item.image).url()}
      gender={item.gender}
      description={item.description}
      category={item.category}
      sub_category={item.sub_category}
    />
  ));

  return (
    <View className="flex-1 bg-white">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={itemData}
        renderItem={({ item }) => item}
        numColumns={2}
        columnWrapperStyle={{
          flexDirection: "row",
          gap: 5,
          paddingVertical: 15,
        }}
      />
    </View>
  );
};

export default clothesList;
