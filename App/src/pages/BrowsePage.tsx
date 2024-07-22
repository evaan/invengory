import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Flex, Input, InputGroup, InputLeftElement, InputRightElement, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { UncontrolledTreeEnvironment, Tree, StaticTreeDataProvider } from 'react-complex-tree';
import { useEffect, useState } from "react";
import { Category } from "../api/types";

export default function BrowsePage() {
    const [categories, setCategories] = useState<{ [int: number]: TreeItem }>({});
    
    interface TreeItem {
        index: number;
        isFolder: boolean;
        children: number[];
        data: string;
    }

    function parseCategory(category: Category): { [int: number]: TreeItem } {
        let output: { [int: number]: TreeItem } = {};
        output[category.ID] = {} as TreeItem;
        output[category.ID].index = category.ID;
        output[category.ID].isFolder = category.ChildCategories.length > 0;
        output[category.ID].children = [];
        output[category.ID].data = category.Name;
        category.ChildCategories.forEach((childCategory => {
            output[category.ID].children.push(childCategory.ID);
            output = {...output, ...parseCategory(childCategory)}
        }));
        return output;
    }

    useEffect(() => {
        fetch("/api/categories").then((response) => response.json()).then((data) => {
            let output: { [int: number]: TreeItem } = {};
            output[0] = {} as TreeItem;
            output[0].index = 0;
            output[0].isFolder = true;
            output[0].data = "root";
            output[0].children = [-1];
            data.forEach((category: Category) => {
                output = {...output, ...parseCategory(category)}
            });
            output[-1] = {} as TreeItem;
            output[-1].index = -1;
            output[-1].isFolder = true;
            output[-1].data = "All Components";
            output[-1].children = Object.keys(data).map(Number).map(key => key+1);
            setCategories(output);
        })
    });
    
    // const items = {
    //     root: {
    //         index: 'root',
    //         isFolder: true,
    //         children: ['child1', 'child2'],
    //         data: 'Root item',
    //     },
    //         child1: {
    //             index: 'child1',
    //             children: [],
    //             data: 'Child item 1',
    //     },
    //         child2: {
    //             index: 'child2',
    //             isFolder: true,
    //             children: ['child3'],
    //             data: 'Child item 2',
    //     },
    //         child3: {
    //             index: 'child3',
    //             children: [],
    //             data: 'Child item 3',
    //     },
    // };

    const dataProvider = new StaticTreeDataProvider(categories, (item, newName) => ({ ...item, data: newName }));
    
    return (
        <>
            <Navbar />
            <Flex>
                <InputGroup mx="8px">
                    <InputLeftElement pointerEvents='none'>
                        <SearchIcon color='gray.300' />
                    </InputLeftElement>
                    <Input colorScheme="blue" placeholder='Search for items...' _placeholder={{opacity: "0.6", color: "#fff"}} />
                    <InputRightElement w="64px">
                        <Button colorScheme="blue" variant="ghost">Filters</Button>
                    </InputRightElement>
                </InputGroup>
                <Button colorScheme="green" w="25%" mr="8px"><Center><AddIcon mr="4px" /> Add Item</Center></Button>
            </Flex>
            <Flex>
                <Box w="30%">
                    <UncontrolledTreeEnvironment
                        dataProvider={dataProvider}
                        getItemTitle={item => item.data}
                        viewState={{
                            ["tree"]: {
                                expandedItems: [-1], 
                                selectedItems: [-1]
                            }
                        }}
                        canDragAndDrop={false}
                        canDropOnFolder={false}
                        canReorderItems={false}
                        disableMultiselect={true}
                        >
                        <Tree treeId="tree" rootItem="0" />
                    </UncontrolledTreeEnvironment>
                </Box>
                <TableContainer w="70%" ml="8px">
                    <Table variant='simple'>
                        <Thead>
                        <Tr>
                            <Th>Image</Th>
                            <Th>Name</Th>
                            <Th isNumeric>Stock</Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                        <Tr>
                            <Td></Td>
                            <Td onClick={() => console.log("1")}>Raspberry Pi 4 Model B</Td>
                            <Td isNumeric textColor="#ff8986">0</Td>
                        </Tr>
                        <Tr>
                            <Td></Td>
                            <Td onClick={() => console.log("2")}>eSun Blue PLA+ Filament Spool</Td>
                            <Td isNumeric>6</Td>
                        </Tr>
                        <Tr>
                            <Td></Td>
                            <Td onClick={() => console.log("3")}>Jonesy Vertical Profiler</Td>
                            <Td isNumeric>1</Td>
                        </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Flex>
        </>
    )
}