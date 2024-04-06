import { ReactFlowProvider } from 'reactflow'
import 'reactflow/dist/style.css'
import { FamilyMember, FamilyMembers, FamilyRelations } from './FamilyTreeChild/Tree/types'
import { FamilyTreeChild } from './FamilyTreeChild'

export type FamilyTreeProps = {
  familyMembers: FamilyMembers
  familyRelations: FamilyRelations
  rootMember: FamilyMember
  onDoubleClick?: (sfdcId: string) => void
}

export const FamilyTree = ({
  familyMembers: rawFamilyMembers,
  familyRelations,
  rootMember,
  onDoubleClick,
}: FamilyTreeProps) => {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ReactFlowProvider>
        <FamilyTreeChild
          familyMembers={rawFamilyMembers}
          familyRelations={familyRelations}
          rootMember={rootMember}
          onDoubleClick={onDoubleClick}
        />
      </ReactFlowProvider>
    </div>
  )
}
