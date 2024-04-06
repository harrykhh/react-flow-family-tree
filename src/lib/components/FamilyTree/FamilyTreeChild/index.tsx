import { useState } from 'react'
import ReactFlow, { MiniMap } from 'reactflow'
import CoupleEdge, { CoupleEdgeTypeKey } from './Family/CoupleEdge'
import { FamilyMemberNodeComp } from './Family/FamilyMemberNode'
import InnerFamilyEdge, { InnerFamilyTypeKey } from './Family/InnerFamilyEdge'
import { buildDataStructure, buildGenerations, buildParentsChildrenStructs } from './Tree/buildDataStructure'
import { buildCouplesEdges, buildEdgesFromParentChildrenRelations } from './Tree/buildEdges'
import {
  addNodeSelection,
  addNodeVisibilityCallback,
  positionAndBuildFamilyTree,
  positionUnknownGeneration,
} from './Tree/positionNodes'
import { FamilyMember, FamilyMembers, FamilyRelations, OTHERS_GENERATION } from './Tree/types'
import { nodeColorForMinimap } from '../../utils'

const nodeTypes = { familyMember: FamilyMemberNodeComp }
const edgeTypes = {
  [InnerFamilyTypeKey]: InnerFamilyEdge,
  [CoupleEdgeTypeKey]: CoupleEdge,
}

export type FamilyTreeProps = {
  familyMembers: FamilyMembers
  familyRelations: FamilyRelations
  rootMember: FamilyMember
  onDoubleClick?: (sfdcId: string) => void
}

export const FamilyTreeChild = ({
  familyMembers: rawFamilyMembers,
  familyRelations,
  rootMember,
  onDoubleClick,
}: FamilyTreeProps) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(rootMember.id)
  const [hiddenNodesIds, setHiddenNodesIds] = useState<string[]>([])

  const familyMembersWithVisibility = Object.fromEntries(
    Object.entries(rawFamilyMembers).map(([key, value]) => {
      value.data.isHidden = hiddenNodesIds.includes(key)
      return [key, value] as const
    }),
  )

  const familyMembersValues = Object.values(familyMembersWithVisibility)
  const familyRelationsValues = Object.values(familyRelations)

  const familyGenerations = buildGenerations(familyMembersWithVisibility, familyRelations, rootMember.id)
  const innerFamiliesPerGeneration = buildDataStructure(familyGenerations, familyRelations)

  const familyNodes = positionAndBuildFamilyTree(innerFamiliesPerGeneration, familyMembersWithVisibility)
  const otherNodes = positionUnknownGeneration(familyGenerations[OTHERS_GENERATION])

  const allNodes = [...familyNodes, ...otherNodes]
  const nodesWithSelectedInfo = addNodeSelection(familyRelations, allNodes, selectedNode)
  const nodesWithVizCallback = addNodeVisibilityCallback(nodesWithSelectedInfo, hiddenNodesIds, setHiddenNodesIds)

  const parentChildrenFamilies = buildParentsChildrenStructs(familyMembersValues, familyRelationsValues)
  const parentChildEdges = buildEdgesFromParentChildrenRelations(parentChildrenFamilies, familyGenerations)

  const couplesEdges = buildCouplesEdges(familyRelationsValues, parentChildEdges, parentChildrenFamilies)

  return (
    <div style={{ height: '100%', width: '100%', direction: 'ltr' }} className="family-chart">
      <ReactFlow
        nodes={nodesWithVizCallback}
        edges={[...parentChildEdges, ...couplesEdges]}
        fitView
        fitViewOptions={{
          padding: 5,
          nodes: allNodes.filter((node) => node.id == selectedNode),
        }}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={{ type: 'smoothstep' }}
        proOptions={{
          hideAttribution: true,
        }}
        onNodeClick={(_, node) => {
          setSelectedNode(node.id)
        }}
        onNodeDoubleClick={(_, node) => onDoubleClick && onDoubleClick(node.id)}
      >
        <MiniMap nodeStrokeWidth={3} pannable zoomable nodeColor={nodeColorForMinimap} />
      </ReactFlow>
    </div>
  )
}
